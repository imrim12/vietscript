import { Keyword } from "@vietscript/shared";
import { Parser } from "@parser/parser";

export class Identifier {
  type = "Identifier";

  name: string;

  constructor(parser: Parser) {
    this.name = String(parser.eat(Keyword.IDENTIFIER)?.value)
      .replace(/[^\sA-Za-z]/g, (match) => {
        // Find vietnamese character and replace
        return `_${match.codePointAt(0)}`;
      })
      .replace(/\s/g, "_");
  }
}
