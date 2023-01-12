import { Parser } from "@lang/parser";

export class BooleanLiteral {
  type = "BooleanLiteral";

  value: boolean;

  raw: string;

  constructor(parser: Parser) {
    const token = parser.eat("Boolean");

    const value = token.value === "true" ? true : false;

    this.value = value;
    this.raw = String(value);
  }
}
