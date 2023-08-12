import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

import { BlockStatement } from "../BlockStatement";

import { CatchClause } from "./CatchClause";

export class TryStatement {
  type = "TryStatement";

  block: BlockStatement;

  handler: CatchClause | null = null;

  finalizer: BlockStatement | null = null;

  constructor(parser: Parser) {
    parser.eat(Keyword.TRY);

    this.block = new BlockStatement(parser);

    if (parser.lookahead?.type !== Keyword.CATCH && parser.lookahead?.type !== Keyword.FINALLY) {
      throw new Error("Expected Catch or Finally");
    }

    if (parser.lookahead?.type === Keyword.CATCH) {
      this.handler = new CatchClause(parser);
    }

    if (parser.lookahead?.type === Keyword.FINALLY) {
      parser.eat(Keyword.FINALLY);
      this.finalizer = new BlockStatement(parser);
    }
  }
}
