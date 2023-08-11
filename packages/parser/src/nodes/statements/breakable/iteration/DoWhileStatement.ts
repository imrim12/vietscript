import { Parser } from "@lang/parser";
import { BlockStatement } from "@lang/nodes/statements/BlockStatement";
import { Expression } from "@lang/nodes/expressions/Expression";

export class DoWhileStatement {
  type = "DoWhileStatement" as const;

  body: BlockStatement;

  test: Expression;

  constructor(parser: Parser) {
    parser.eat("Do");

    this.body = new BlockStatement(parser);

    parser.eat("While");

    parser.eat("(");

    this.test = new Expression(parser);

    parser.eat(")");
  }
}
