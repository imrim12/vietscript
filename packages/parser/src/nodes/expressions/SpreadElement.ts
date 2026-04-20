import { Parser } from "@parser/parser";

import { Expression } from "./Expression";

export class SpreadElement {
  type = "SpreadElement";

  argument: Expression;

  constructor(parser: Parser) {
    parser.eat("...");
    this.argument = new Expression(parser);
  }
}
