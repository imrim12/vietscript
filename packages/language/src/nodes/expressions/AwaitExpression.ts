import { Parser } from "@lang/parser";

import { Expression } from "./Expression";

export class AwaitExpression {
  type = "AwaitExpression";

  argument: Expression;

  constructor(parser: Parser) {
    parser.eat("Await");

    this.argument = new Expression(parser);
  }
}
