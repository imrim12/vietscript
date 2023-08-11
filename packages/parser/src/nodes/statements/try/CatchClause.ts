import { Parser } from "@lang/parser";
import { Identifier } from "@lang/nodes/identifier/Identifier";

import { BlockStatement } from "../BlockStatement";

export class CatchClause {
  type = "CatchClause";

  body: BlockStatement;

  param: Identifier | null = null;

  constructor(parser: Parser) {
    parser.eat("Catch");

    if (parser.lookahead?.type === "(") {
      parser.eat("(");
      this.param = new Identifier(parser);
      parser.eat(")");
    }

    this.body = new BlockStatement(parser);
  }
}
