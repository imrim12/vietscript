import { Parser } from "@lang/parser";

import { Expression } from "../expressions/Expression";

export class ExpressionStatement {
  [key: string]: any;

  constructor(parser: Parser) {
    Object.assign(this, new Expression(parser));
  }
}
