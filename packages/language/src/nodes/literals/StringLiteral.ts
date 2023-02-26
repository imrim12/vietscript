import { Node } from "@vietscript/shared";
import { Parser } from "@lang/parser";

export class StringLiteral implements Node {
  type = "StringLiteral";

  value: string;

  raw: string;

  start: number;

  end: number;

  constructor(parser: Parser) {
    const token = parser.eat("String");

    this.start = token.start;
    this.end = token.end;

    const value = String(token.value).slice(1, -1);

    this.value = value;
    this.raw = JSON.stringify(value);
  }
}
