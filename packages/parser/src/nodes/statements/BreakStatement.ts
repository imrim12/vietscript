import { Parser } from "@parser/parser";

import { Identifier } from "../identifier/Identifier";

export class BreakStatement {
  type = "BreakStatement";

  label: null | string;

  constructor(parser: Parser) {
    parser.eat("Break");

    let label: BreakStatement["label"] = null;

    if (parser.lookahead?.type === "Identifier") {
      label = new Identifier(parser).name;
    }

    this.label = label;
  }
}
