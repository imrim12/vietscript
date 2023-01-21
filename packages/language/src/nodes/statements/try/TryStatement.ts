import { Parser } from "@lang/parser";

import { BlockStatement } from "../BlockStatement";

import { CatchClause } from "./CatchClause";

export class TryStatement {
  type = "TryStatement";

  block: BlockStatement;

  handler: CatchClause | null = null;

  finalizer: BlockStatement | null = null;

  constructor(parser: Parser) {
    parser.eat("Try");

    this.block = new BlockStatement(parser);

    if (parser.lookahead?.type !== "Catch" && parser.lookahead?.type !== "Finally") {
      throw new Error("Expected Catch or Finally");
    }

    if (parser.lookahead?.type === "Catch") {
      this.handler = new CatchClause(parser);
    }

    if (parser.lookahead?.type === "Finally") {
      parser.eat("Finally");
      this.finalizer = new BlockStatement(parser);
    }
  }
}
