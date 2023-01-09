import { Parser } from "@lang/parser";

export class NumericLiteral {
  node: {
    type: "NumericLiteral";
    value: number;
    raw: string;
  };

  constructor(parser: Parser) {
    const token = parser.eat("Number");

    const value = Number(token.value);

    this.node = {
      type: "NumericLiteral",
      value,
      raw: String(value),
    };
  }
}
