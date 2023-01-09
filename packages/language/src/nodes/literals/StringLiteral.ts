import { Parser } from "@lang/parser";

export class StringLiteral {
  node: {
    type: "StringLiteral";
    value: string;
    raw: string;
  };

  constructor(parser: Parser) {
    const token = parser.eat("String");

    const value = String(token.value).slice(1, -1);

    this.node = {
      type: "StringLiteral",
      value,
      raw: JSON.stringify(value),
    };
  }
}
