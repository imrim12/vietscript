import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

import { Expression } from "./Expression";

export class AwaitExpression {
  type = "AwaitExpression";

  argument: Expression;

  constructor(parser: Parser) {
    parser.eat(Keyword.AWAIT);

    this.argument = new Expression(parser);
  }
}
