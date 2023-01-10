import { Parser } from "@lang/parser";

import { Expression } from "../expressions/Expression";

export class ExpressionStatement {
  node: Record<string, any>;

  constructor(parser: Parser) {
    this.node = new Expression(parser).node;
  }
}
