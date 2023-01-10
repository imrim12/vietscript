import { Parser } from "@lang/parser";

export class UndefinedLiteral {
  type: "UndefinedLiteral";

  raw: string;

  constructor(parser: Parser) {
    parser.eat("Undefined");

    this.type = "UndefinedLiteral";
    this.raw = "undefined";
  }
}
