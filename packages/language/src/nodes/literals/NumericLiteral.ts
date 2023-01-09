import { Parser } from "@lang/parser";

export class NumericLiteral {
  node: {
    type: "NumericLiteral";
    value: number;
    raw: string;
  };

  constructor(parser: Parser) {
    let isMinus = false;

    if (parser.lookahead?.value === "-") {
      isMinus = true;
      parser.eat("-");
    }

    const token = parser.eat("Number");

    const value = isMinus ? -token.value : Number(token.value);

    this.node = {
      type: "NumericLiteral",
      value,
      raw: String(value),
    };
  }
}
