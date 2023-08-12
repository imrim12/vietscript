import { Parser } from "@parser/parser";
import { Keyword, Node } from "@vietscript/shared";

export class UndefinedIdentifier implements Node {
  type = Keyword.IDENTIFIER;

  name = Keyword.UNDEFINED;

  start: number;

  end: number;

  constructor(parser: Parser) {
    const token = parser.eat(Keyword.UNDEFINED);

    this.start = token.start;
    this.end = token.end;
  }
}
