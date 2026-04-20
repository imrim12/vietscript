import { Keyword } from "@vietscript/shared";
import { Parser } from "@parser/parser";

import { Expression } from "../expressions/Expression";

import { BlockStatement } from "./BlockStatement";
import { Statement } from "./Statement";

export class WithStatement {
  type = "WithStatement";

  object: Expression;

  body: Statement | BlockStatement;

  constructor(parser: Parser) {
    parser.eat(Keyword.WITH);
    parser.eat("(");
    this.object = new Expression(parser);
    parser.eat(")");
    this.body = parser.lookahead?.type === "{" ? new BlockStatement(parser) : new Statement(parser);
  }
}
