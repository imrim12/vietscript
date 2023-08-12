import { Parser } from "@parser/parser";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Expression } from "@parser/nodes/expressions/Expression";
import { Keyword } from "@vietscript/shared";

import { BlockStatement } from "./BlockStatement";
import { Statement } from "./Statement";

export class IfStatement {
  type = "IfStatement";

  test: Identifier | Expression;

  consequent: Statement | BlockStatement;

  alternate?: Statement | BlockStatement;

  constructor(parser: Parser) {
    parser.eat(Keyword.IF);

    parser.eat("(");

    this.test = parser.lookahead?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser);

    parser.eat(")");

    this.consequent = parser.lookahead?.type === "{" ? new BlockStatement(parser) : new Statement(parser);

    if (parser.lookahead?.type === Keyword.ELSE) {
      parser.eat(Keyword.ELSE);

      // @ts-ignore
      if (parser.lookahead?.type === Keyword.IF) {
        this.alternate = new IfStatement(parser);
      } else {
        this.alternate =
          // @ts-ignore
          parser.lookahead?.type === "{" ? new BlockStatement(parser) : new Statement(parser);
      }
    }
  }
}
