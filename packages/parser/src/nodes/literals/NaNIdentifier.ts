import { Parser } from "@parser/parser";
import { Keyword, Node } from "@vietscript/shared";

export class NaNIdentifier implements Node {
  type = Keyword.IDENTIFIER;

  name = Keyword.NAN;

  start: number;

  end: number;

  constructor(parser: Parser) {
    const token = parser.eat(Keyword.NAN);

    this.start = token.start;
    this.end = token.end;
  }
}
