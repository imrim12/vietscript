import { Node } from "@davascript/shared";
import { Parser } from "@lang/parser";

export class NullLiteral implements Node {
  type = "NullLiteral";

  value: null;

  raw: string;

  start: number;

  end: number;

  constructor(parser: Parser) {
    const token = parser.eat("Null");

    this.start = token.start;
    this.end = token.end;

    this.value = null;
    this.raw = "null";
  }
}
