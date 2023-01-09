import { Parser } from "@lang/parser";

export class BooleanLiteral {
  node: {
    type: "BooleanLiteral";
    value: boolean;
    raw: string;
  };

  constructor(parser: Parser) {
    const token = parser.eat("Boolean");

    const value = token.value === "true" ? true : false;

    this.node = {
      type: "BooleanLiteral",
      value: value,
      raw: String(value),
    };
  }
}
