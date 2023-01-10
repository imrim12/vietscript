import { Parser } from "@lang/parser";

import { Expression } from "../expressions/Expression";

export class ReturnStatement {
  type: "ReturnStatement";

  argument: Expression;

  constructor(parser: Parser) {
    parser.eat("Return");

    const expression = new Expression(parser);

    this.type = "ReturnStatement";
    this.argument = expression;
  }
}
