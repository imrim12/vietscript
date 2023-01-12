import { Parser } from "@lang/parser";
import { VariableDeclaration } from "@lang/nodes/declarations/VariableDeclaration";
import { Statement } from "@lang/nodes/statements/Statement";
import { BlockStatement } from "@lang/nodes/statements/BlockStatement";
import { Expression } from "@lang/nodes/expressions/Expression";

export class ForStatement {
  type = "ForStatement" as const;

  init: VariableDeclaration;

  test: Expression;

  update: Expression;

  body: Statement | BlockStatement;

  constructor(parser: Parser) {
    parser.eat("For");

    parser.eat("(");

    this.init = new VariableDeclaration(parser);

    parser.eat(";");

    this.test = new Expression(parser);

    if (parser.lookahead?.type === ";") {
      parser.eat(";");
    }

    if (parser.lookahead?.type !== ")") {
      this.update = new Expression(parser);
    }

    parser.eat(")");

    this.body = parser.lookahead?.type === "{" ? new BlockStatement(parser) : new Statement(parser);
  }
}
