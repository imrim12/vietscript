import { Parser } from "@lang/parser";

export class UndefinedLiteral {
  type: "UndefinedLiteral";

  value: undefined;

  raw: string;

  constructor(parser: Parser) {
    parser.eat("Undefined");

    this.type = "UndefinedLiteral";
    // TODO: toPlainObject removes the undefined value, lead to fail test
    this.value = undefined;
    this.raw = "undefined";
  }
}
