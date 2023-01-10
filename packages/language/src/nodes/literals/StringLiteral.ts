import { Parser } from "@lang/parser";

export class StringLiteral {
  type: "StringLiteral";

  value: string;

  raw: string;

  constructor(parser: Parser) {
    const token = parser.eat("String");

    const value = String(token.value).slice(1, -1);

    this.type = "StringLiteral";
    this.value = value;
    this.raw = JSON.stringify(value);
  }
}