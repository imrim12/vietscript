import { Parser } from "@parser/parser";

import { Expression } from "../expressions/Expression";

export class ExpressionStatement {
  type = "ExpressionStatement";

  expression: Expression;

  constructor(parser: Parser) {
    this.expression = new Expression(parser);
  }
}
