import { Parser } from "@lang/parser";
import { Literal } from "@lang/nodes/literals/Literal";
import { Identifier } from "@lang/nodes/identifier/Identifier";

import { ArrayExpression } from "./ArrayExpression";
import { FunctionExpression } from "./FunctionExpression";
import { BinaryExpression } from "./BinaryExpression";
import { AssignmentExpression } from "./AssignmentExpression";
import { UpdateExpression } from "./UpdateExpression";
import { UnaryExpression } from "./UnaryExpression";

export class Expression {
  [key: string]: any;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case "Async":
      case "Function": {
        Object.assign(this, new FunctionExpression(parser));
        break;
      }
      case "[": {
        Object.assign(this, new ArrayExpression(parser));
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
      case "Identifier": {
        const identifier = new Identifier(parser);

        if ([">", "<", ">=", "<=", "==", "==="].includes(parser.lookahead?.type)) {
          Object.assign(this, new BinaryExpression(parser, identifier));
          // @ts-ignore
        } else if (parser.lookahead?.type === "=") {
          Object.assign(this, new AssignmentExpression(parser, identifier));
        } else {
          Object.assign(this, identifier);
        }

        break;
      }
      case "++":
      case "--": {
        Object.assign(this, new UpdateExpression(parser));
        break;
      }
      case "+":
      case "-":
      case "~":
      case "!": {
        Object.assign(this, new UnaryExpression(parser));
        break;
      }
      default: {
        Object.assign(this, new Identifier(parser));
        break;
      }
    }
  }
}
