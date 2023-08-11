import { Parser } from "@lang/parser";

import { Identifier } from "../identifier/Identifier";

export class ContinueStatement {
  type = "ContinueStatement";

  label: null | string;

  constructor(parser: Parser) {
    parser.eat("Break");

    let label: ContinueStatement["label"] = null;

    if (parser.lookahead?.type === "Identifier") {
      label = new Identifier(parser).name;
    }

    this.label = label;
  }
}
