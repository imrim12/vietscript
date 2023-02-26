import { Node } from "@vietscript/shared";
import { Parser } from "@lang/parser";

export class NumericLiteral implements Node {
  type = "NumericLiteral";

  value: number;

  raw: string;

  start: number;

  end: number;

  constructor(parser: Parser) {
    const token = parser.eat("Number");

    this.start = token.start;
    this.end = token.end;

    this.value = Number(token.value);
    this.raw = String(token.value);
  }
}
