import { Parser } from "@parser/parser";
import { Keyword, Node } from "@vietscript/shared";

export class InfinityIdentifier implements Node {
  type = Keyword.IDENTIFIER;

  name = "Infinity";

  start: number;

  end: number;

  constructor(parser: Parser) {
    const token = parser.eat(Keyword.INFINITY);

    this.start = token.start;
    this.end = token.end;
  }
}
