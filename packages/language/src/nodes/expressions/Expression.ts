import { Parser } from "@lang/parser";

import { Literal } from "../literals/Literal";

import { ArrayExpression } from "./ArrayExpression";
import { FunctionExpression } from "./FunctionExpression";

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
      default: {
        Object.assign(this, new Literal(parser));
        break;
      }
    }
  }
}
