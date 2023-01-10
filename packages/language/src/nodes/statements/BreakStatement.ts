import { Parser } from "@lang/parser";

export class BreakStatement {
  node: {
    type: "BreakStatement";
    label: null | string;
  };

  constructor(parser: Parser) {
    parser.eat("Break");

    let label: BreakStatement["node"]["label"] = null;

    if (parser.lookahead?.type === "Identifier") {
      label = String(parser.eat("Identifier").value);
    }

    this.node = {
      type: "BreakStatement",
      label,
    };
  }
}
