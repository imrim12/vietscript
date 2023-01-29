import { Node } from "@davascript/shared";
import { Parser } from "@lang/parser";

export class UndefinedLiteral implements Node {
  type = "UndefinedLiteral";

  value: undefined;

  raw: string;

  start: number;

  end: number;

  constructor(parser: Parser) {
    const token = parser.eat("Undefined");

    this.start = token.start;
    this.end = token.end;

    // TODO: toPlainObject removes the undefined value, lead to fail test
    this.value = undefined;
    this.raw = "undefined";
  }
}
