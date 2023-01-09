import { Parser } from "@lang/parser";

export class NaNLiteral {
  node: {
    type: "NaNLiteral";
    value: number;
    raw: string;
  };

  constructor(parser: Parser) {
    parser.eat("NaN");

    this.node = {
      type: "NaNLiteral",
      value: Number.NaN,
      raw: "NaN",
    };
  }
}
