import { Keyword, Node } from "@vietscript/shared";
import { Parser } from "@parser/parser";

export class NullLiteral implements Node {
  type = "NullLiteral";

  start: number;

  end: number;

  constructor(parser: Parser) {
    const token = parser.eat(Keyword.NULL);

    this.start = token.start;
    this.end = token.end;
  }
}
