import { Parser } from "@parser/parser";
import { Keyword, Node } from "@vietscript/shared";

export class BooleanLiteral implements Node {
  type = "BooleanLiteral";

  value: boolean;

  start: number;

  end: number;

  constructor(parser: Parser) {
    const token = parser.eat(Keyword.BOOLEAN);

    this.start = token.start;
    this.end = token.end;

    const value = token.value === "true" ? true : token.value === "đúng" ? true : false;

    this.value = value;
  }
}
