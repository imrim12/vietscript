import { Parser } from "@lang/parser";

export class NumericLiteral {
  type = "NumericLiteral";

  value: number;

  raw: string;

  constructor(parser: Parser) {
    let isMinus = false;

    if (parser.lookahead?.value === "-") {
      isMinus = true;
      parser.eat("-");
    }

    const token = parser.eat("Number");

    const value = isMinus ? -token.value : Number(token.value);

    this.value = value;
    this.raw = String(value);
  }
}
