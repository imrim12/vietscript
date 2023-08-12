import { Parser } from "@parser/parser";
import { BlockStatement } from "@parser/nodes/statements/BlockStatement";
import { Expression } from "@parser/nodes/expressions/Expression";
import { Keyword } from "@vietscript/shared";

export class DoWhileStatement {
  type = "DoWhileStatement";

  body: BlockStatement;

  test: Expression;

  constructor(parser: Parser) {
    parser.eat(Keyword.DO);

    this.body = new BlockStatement(parser);

    parser.eat(Keyword.WHILE);

    parser.eat("(");

    this.test = new Expression(parser);

    parser.eat(")");
  }
}
