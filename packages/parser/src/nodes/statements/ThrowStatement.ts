import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

import { Expression } from "../expressions/Expression";

export class ThrowStatement {
  type = "ThrowStatement";

  argument: Expression;

  constructor(parser: Parser) {
    parser.eat(Keyword.THROW);

    const expression = new Expression(parser);

    this.argument = expression;
  }
}
