import { Parser } from "@lang/parser";

export class BreakStatement {
  type: "BreakStatement";

  label: null | string;

  constructor(parser: Parser) {
    parser.eat("Break");

    let label: BreakStatement["label"] = null;

    if (parser.lookahead?.type === "Identifier") {
      label = String(parser.eat("Identifier").value);
    }

    this.type = "BreakStatement";
    this.label = label;
  }
}
