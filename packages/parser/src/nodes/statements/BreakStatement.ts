import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

import { Identifier } from "../identifier/Identifier";

export class BreakStatement {
  type = "BreakStatement";

  label: Identifier | null = null;

  constructor(parser: Parser) {
    parser.eat(Keyword.BREAK);

    if (parser.lookahead?.type === Keyword.IDENTIFIER) {
      this.label = new Identifier(parser);
    }
  }
}
