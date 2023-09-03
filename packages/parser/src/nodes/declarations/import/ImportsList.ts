import { Parser } from "@parser/parser";

import { ImportSpecifier } from "./ImportSpecifier";

export class ImportsList {
  specifiers: Array<ImportSpecifier> = [];

  constructor(parser: Parser) {
    while (parser.lookahead?.type !== "}") {
      this.specifiers.push(new ImportSpecifier(parser));

      if (parser.lookahead?.type === ",") {
        parser.eat(",");
      }
    }
  }
}
