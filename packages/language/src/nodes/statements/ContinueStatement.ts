import { Parser } from "@lang/parser";

export class ContinueStatement {
  node: {
    type: "ContinueStatement";
    label: null | string;
  };

  constructor(parser: Parser) {
    parser.eat("Continue");

    let label: ContinueStatement["node"]["label"] = null;

    if (parser.lookahead?.type === "Identifier") {
      label = String(parser.eat("Identifier").value);
    }

    this.node = {
      type: "ContinueStatement",
      label,
    };
  }
}
