import { Node } from "@vietscript/shared";
import { Parser } from "@parser/parser";

export class NaNLiteral implements Node {
  type = "NaNLiteral";

  value: number;

  raw: string;

  start: number;

  end: number;

  constructor(parser: Parser) {
    const token = parser.eat("NaN");

    this.start = token.start;
    this.end = token.end;

    this.value = Number.NaN;
    this.raw = "NaN";
  }
}
