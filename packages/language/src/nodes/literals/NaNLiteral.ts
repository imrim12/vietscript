import { Parser } from "@lang/parser";

export class NaNLiteral {
  type: "NaNLiteral";

  value: number;

  raw: string;

  constructor(parser: Parser) {
    parser.eat("NaN");

    this.type = "NaNLiteral";
    this.value = Number.NaN;
    this.raw = "NaN";
  }
}