import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

import { Expression } from "../expressions/Expression";

export class ReturnStatement {
  type = "ReturnStatement";

  argument: Expression;

  constructor(parser: Parser) {
    parser.eat(Keyword.RETURN);

    const expression = new Expression(parser);

    this.argument = expression;
  }
}
