import { Parser } from "@parser/parser";

import { Expression } from "../expressions/Expression";

export class ThrowStatement {
  type = "ThrowStatement";

  argument: Expression;

  constructor(parser: Parser) {
    parser.eat("Throw");

    const expression = new Expression(parser);

    this.argument = expression;
  }
}
