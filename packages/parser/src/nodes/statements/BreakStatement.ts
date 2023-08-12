import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

import { Identifier } from "../identifier/Identifier";

export class BreakStatement {
  type = "BreakStatement";

  label: null | string;

  constructor(parser: Parser) {
    parser.eat(Keyword.BREAK);

    let label: BreakStatement["label"] = null;

    if (parser.lookahead?.type === Keyword.IDENTIFIER) {
      label = new Identifier(parser).name;
    }

    this.label = label;
  }
}
