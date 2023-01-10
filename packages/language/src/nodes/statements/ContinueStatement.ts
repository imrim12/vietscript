import { Parser } from "@lang/parser";

export class ContinueStatement {
  type: "ContinueStatement";

  label: null | string;

  constructor(parser: Parser) {
    parser.eat("Break");

    let label: ContinueStatement["label"] = null;

    if (parser.lookahead?.type === "Identifier") {
      label = String(parser.eat("Identifier").value);
    }

    this.type = "ContinueStatement";
    this.label = label;
  }
}
