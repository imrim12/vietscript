import { Parser } from "@parser/parser";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Keyword } from "@vietscript/shared";

import { BlockStatement } from "../BlockStatement";

export class CatchClause {
  type = "CatchClause";

  body: BlockStatement;

  param: Identifier | null = null;

  constructor(parser: Parser) {
    parser.eat(Keyword.CATCH);

    if (parser.lookahead?.type === "(") {
      parser.eat("(");
      this.param = new Identifier(parser);
      parser.eat(")");
    }

    this.body = new BlockStatement(parser);
  }
}
