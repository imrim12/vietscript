import { Parser } from "@lang/parser";
import { Statement } from "@lang/nodes/statements/Statement";
import { BlockStatement } from "@lang/nodes/statements/BlockStatement";
import { Expression } from "@lang/nodes/expressions/Expression";

export class WhileStatement {
  type = "WhileStatement";

  body: Statement | BlockStatement;

  test: Expression;

  constructor(parser: Parser) {
    parser.eat("While");

    parser.eat("(");

    this.test = new Expression(parser);

    parser.eat(")");

    this.body = parser.lookahead?.type === "{" ? new BlockStatement(parser) : new Statement(parser);
  }
}
