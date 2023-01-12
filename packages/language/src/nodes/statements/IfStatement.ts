import { Parser } from "@lang/parser";
import { Identifier } from "@lang/nodes/identifier/Identifier";
import { Expression } from "@lang/nodes/expressions/Expression";

import { BlockStatement } from "./BlockStatement";
import { Statement } from "./Statement";

export class IfStatement {
  type = "IfStatement" as const;

  test: Identifier | Expression;

  consequent: Statement | BlockStatement;

  alternate?: Statement | BlockStatement;

  constructor(parser: Parser) {
    parser.eat("If");

    parser.eat("(");

    this.test =
      parser.lookahead?.type === "Identifier" ? new Identifier(parser) : new Expression(parser);

    parser.eat(")");

    this.consequent =
      parser.lookahead?.type === "{" ? new BlockStatement(parser) : new Statement(parser);

    if (parser.lookahead?.type === "Else") {
      parser.eat("Else");

      // @ts-ignore
      if (parser.lookahead?.type === "If") {
        this.alternate = new IfStatement(parser);
      } else {
        this.alternate =
          // @ts-ignore
          parser.lookahead?.type === "{" ? new BlockStatement(parser) : new Statement(parser);
      }
    }
  }
}
