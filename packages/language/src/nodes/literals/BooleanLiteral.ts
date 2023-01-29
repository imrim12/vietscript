import { Node } from "@davascript/shared";
import { Parser } from "@lang/parser";

export class BooleanLiteral implements Node {
  type = "BooleanLiteral";

  value: boolean;

  raw: string;

  start: number;

  end: number;

  constructor(parser: Parser) {
    const token = parser.eat("Boolean");

    this.start = token.start;
    this.end = token.end;

    const value = token.value === "true" ? true : false;

    this.value = value;
    this.raw = String(value);
  }
}
