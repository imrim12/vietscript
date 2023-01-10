import { Parser } from "@lang/parser";

export class NullLiteral {
  type: "NullLiteral";

  value: null;

  raw: string;

  constructor(parser: Parser) {
    parser.eat("Null");

    this.type = "NullLiteral";
    this.value = null;
    this.raw = "null";
  }
}
