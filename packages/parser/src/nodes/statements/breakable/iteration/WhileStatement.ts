import { Parser } from "@parser/parser";
import { Statement } from "@parser/nodes/statements/Statement";
import { BlockStatement } from "@parser/nodes/statements/BlockStatement";
import { Expression } from "@parser/nodes/expressions/Expression";
import { Keyword } from "@vietscript/shared";

export class WhileStatement {
  type = "WhileStatement";

  body: Statement | BlockStatement;

  test: Expression;

  constructor(parser: Parser) {
    parser.eat(Keyword.WHILE);

    parser.eat("(");

    this.test = new Expression(parser);

    parser.eat(")");

    this.body = parser.lookahead?.type === "{" ? new BlockStatement(parser) : new Statement(parser);
  }
}
