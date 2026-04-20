import { Parser } from "@parser/parser";
import { Literal } from "@parser/nodes/literals/Literal";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Keyword } from "@vietscript/shared";

import { LabelledStatement } from "../statements/LabelledStatement";

import { ParameterList } from "../declarations/ParameterList";

import { ArrayExpression } from "./ArrayExpression";
import { ArrowFunctionExpression } from "./ArrowFunctionExpression";
import { FunctionExpression } from "./FunctionExpression";
import { BinaryExpression } from "./BinaryExpression";
import { AssignmentExpression } from "./AssignmentExpression";
import { UpdateExpression } from "./UpdateExpression";
import { UnaryExpression } from "./UnaryExpression";
import { LogicalExpression } from "./LogicalExpression";
import { AwaitExpression } from "./AwaitExpression";
import { YieldExpression } from "./YieldExpression";
import { ThisExpression } from "./ThisExpression";
import { MemberExpression } from "./MemberExpression";
import { ObjectExpression } from "./ObjectExpression";
import { CallExpression } from "./CallExpression";
import { NewExpression } from "./NewExpression";
import { ConditionalExpression } from "./ConditionalExpression";
import { TaggedTemplateExpression } from "./TaggedTemplateExpression";

export class Expression {
  [key: string]: any;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type as string) {
      case Keyword.ASYNC:
      case Keyword.FUNCTION: {
        Object.assign(this, new FunctionExpression(parser));
        break;
      }
      case "[": {
        Object.assign(this, new ArrayExpression(parser));
        break;
      }
      case "(": {
        parser.eat("(");
        const arrowParams = new ParameterList(parser, ")").parameters;
        parser.eat(")");
        Object.assign(this, new ArrowFunctionExpression(parser, arrowParams));
        break;
      }
      case "{": {
        Object.assign(this, new ObjectExpression(parser));
        break;
      }
      case Keyword.NUMBER:
      case Keyword.STRING:
      case "TemplateLiteral":
      case "RegExpLiteral":
      case Keyword.BOOLEAN:
      case Keyword.NAN:
      case Keyword.INFINITY:
      case Keyword.NULL:
      case Keyword.UNDEFINED: {
        Object.assign(this, new Literal(parser));
        break;
      }
      case "++":
      case "--": {
        Object.assign(this, new UpdateExpression(parser));
        break;
      }
      case Keyword.DELETE:
      case Keyword.VOID:
      case Keyword.TYPEOF:
      case "+":
      case "-":
      case "~":
      case "!": {
        Object.assign(this, new UnaryExpression(parser));
        break;
      }
      case Keyword.AWAIT: {
        Object.assign(this, new AwaitExpression(parser));
        break;
      }
      case Keyword.YIELD: {
        Object.assign(this, new YieldExpression(parser));
        break;
      }
      case Keyword.NEW: {
        Object.assign(this, new NewExpression(parser));
        break;
      }
      case Keyword.IMPORT: {
        parser.eat(Keyword.IMPORT);
        if ((parser.lookahead?.type as string) === "(") {
          const importNode = { type: "Import" };
          Object.assign(this, new CallExpression(parser, importNode as any));
        }
        break;
      }
      case Keyword.SUPER: {
        parser.eat(Keyword.SUPER);
        const superNode = { type: "Super" };
        if ((parser.lookahead?.type as string) === "(") {
          Object.assign(this, new CallExpression(parser, superNode as any));
        } else if ((parser.lookahead?.type as string) === ".") {
          Object.assign(this, new MemberExpression(parser, superNode as any));
        } else {
          Object.assign(this, superNode);
        }
        break;
      }
      case Keyword.THIS: {
        Object.assign(this, new ThisExpression(parser));

        if (parser.lookahead?.type === ".") {
          Object.assign(this, new MemberExpression(parser, this));
        }
        break;
      }
      case Keyword.IDENTIFIER: {
        const identifier = new Identifier(parser);

        if ((parser.lookahead?.type as string) === "=>") {
          Object.assign(this, new ArrowFunctionExpression(parser, [identifier]));
          break;
        }

        if ((parser.lookahead?.type as string) === "TemplateLiteral") {
          Object.assign(this, new TaggedTemplateExpression(parser, identifier));
          break;
        }

        if ((parser.lookahead?.type as string) === "++" || (parser.lookahead?.type as string) === "--") {
          const op = parser.lookahead?.value as string;
          parser.eat(op);
          Object.assign(this, {
            type: "UpdateExpression",
            operator: op,
            argument: identifier,
            prefix: false,
          });
          break;
        }

        switch (parser.lookahead?.type as string) {
          case "+":
          case "-":
          case "*":
          case "/":
          case "%":
          case "**":
          case "&":
          case "|":
          case "^":
          case ">":
          case ">>":
          case ">>>":
          case "<":
          case "<<":
          case ">=":
          case "<=":
          case "==":
          case "===":
          case "!=":
          case "!==":
          case Keyword.INSTANCEOF:
          case Keyword.IN: {
            Object.assign(this, new BinaryExpression(parser, identifier));
            break;
          }
          case "=":
          case "+=":
          case "-=":
          case "*=":
          case "/=":
          case "%=":
          case "**=":
          case "&=":
          case "|=":
          case "^=":
          case "<<=":
          case ">>=":
          case ">>>=":
          case "&&=":
          case "||=":
          case "??=": {
            Object.assign(this, new AssignmentExpression(parser, identifier));
            break;
          }
          case "??":
          case "||":
          case "&&": {
            Object.assign(this, new LogicalExpression(parser, identifier));
            break;
          }
          case "?": {
            Object.assign(this, new ConditionalExpression(parser, identifier));
            break;
          }
          case ":": {
            if (parser.ternaryDepth > 0) {
              Object.assign(this, identifier);
            } else {
              Object.assign(this, new LabelledStatement(parser, identifier));
            }
            break;
          }
          case "(": {
            Object.assign(this, new CallExpression(parser, identifier));
            break;
          }
          case "[":
          case ".":
          case "?.": {
            const memberExpression = new MemberExpression(parser, identifier);

            switch (parser.lookahead?.type) {
              case "=": {
                Object.assign(this, new AssignmentExpression(parser, memberExpression));
                break;
              }
              case "(": {
                Object.assign(this, new CallExpression(parser, memberExpression));
                break;
              }
              default: {
                Object.assign(this, memberExpression);
                break;
              }
            }
            break;
          }
          default: {
            Object.assign(this, identifier);
            break;
          }
        }

        break;
      }
    }
  }
}
