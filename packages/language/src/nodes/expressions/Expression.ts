import { Parser } from "@lang/parser";
import { Literal } from "@lang/nodes/literals/Literal";
import { Identifier } from "@lang/nodes/identifier/Identifier";

import { LabelledStatement } from "../statements/LabelledStatement";

import { ArrayExpression } from "./ArrayExpression";
import { FunctionExpression } from "./FunctionExpression";
import { BinaryExpression } from "./BinaryExpression";
import { AssignmentExpression } from "./AssignmentExpression";
import { UpdateExpression } from "./UpdateExpression";
import { UnaryExpression } from "./UnaryExpression";
import { LogicalExpression } from "./LogicalExpression";
import { AwaitExpression } from "./AwaitExpression";
import { ThisExpression } from "./ThisExpression";
import { MemberExpression } from "./MemberExpression";
import { ObjectExpression } from "./ObjectExpression";
import { CallExpression } from "./CallExpression";

export class Expression {
  [key: string]: any;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type as string) {
      case "Async":
      case "Function": {
        Object.assign(this, new FunctionExpression(parser));
        break;
      }
      case "[": {
        Object.assign(this, new ArrayExpression(parser));
        break;
      }
      case "{": {
        Object.assign(this, new ObjectExpression(parser));
        break;
      }
      case "Number":
      case "String":
      case "Boolean":
      case "NaN":
      case "Null":
      case "Undefined": {
        Object.assign(this, new Literal(parser));
        break;
      }
      case "++":
      case "--": {
        Object.assign(this, new UpdateExpression(parser));
        break;
      }
      case "delete":
      case "void":
      case "typeof":
      case "+":
      case "-":
      case "~":
      case "!": {
        Object.assign(this, new UnaryExpression(parser));
        break;
      }
      case "Await": {
        Object.assign(this, new AwaitExpression(parser));
        break;
      }
      case "This": {
        Object.assign(this, new ThisExpression(parser));

        if (parser.lookahead?.type === ".") {
          Object.assign(this, new MemberExpression(parser, this));
        }
        break;
      }
      case "Identifier": {
        const identifier = new Identifier(parser);

        // TODO: handle more cases
        switch (parser.lookahead?.type as string) {
          case "+":
          case "-":
          case "*":
          case "/":
          case "%":
          case "**":
          case "^":
          case ">":
          case ">>":
          case ">>>":
          case "<":
          case "<<":
          case "<<<":
          case ">=":
          case "<=":
          case "==":
          case "===": {
            Object.assign(this, new BinaryExpression(parser, identifier));
            break;
          }
          case "=": {
            Object.assign(this, new AssignmentExpression(parser, identifier));
            break;
          }
          case "??":
          case "||":
          case "&&": {
            Object.assign(this, new LogicalExpression(parser, identifier));
            break;
          }
          case ":": {
            Object.assign(this, new LabelledStatement(parser, identifier));
            break;
          }
          case "[":
          case ".": {
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
