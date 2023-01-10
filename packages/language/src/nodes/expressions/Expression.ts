import { Parser } from "@lang/parser";

import { Literal } from "../literals/Literal";

import { ArrayExpression } from "./ArrayExpression";
import { FunctionExpression } from "./FunctionExpression";

export class Expression {
  node: Record<string, any>;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case "Async":
      case "Function": {
        this.node = new FunctionExpression(parser).node;
        break;
      }
      case "[": {
        this.node = new ArrayExpression(parser).node;
        break;
      }
      default: {
        this.node = new Literal(parser).node;
        break;
      }
    }
  }
}
