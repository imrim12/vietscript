import { Keyword } from "@vietscript/shared";
import { Parser } from "@parser/parser";

export class Identifier {
  type = "Identifier";

  name: string;

  constructor(parser: Parser) {
    // TODO: optimize later
    this.name = `_${String(parser.eat(Keyword.IDENTIFIER)?.value).replace(
      /(\s)|(^[0-9]+)|([^\sA-Za-z])/g,
      (_, p1, p2, p3) => {
        if (p1) return "_";
        else if (p2) return "_" + p2;
        else return String(p3.codePointAt(0));
      },
    )}`;
  }
}
