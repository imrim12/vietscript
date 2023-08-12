import { Keyword } from "@vietscript/shared";
import { Parser } from "@parser/parser";

export class Identifier {
  type = "Identifier";

  name: string;

  constructor(parser: Parser) {
    this.name = String(parser.eat(Keyword.IDENTIFIER)?.value);
  }
}
