import { Parser } from "@parser/parser";

import { ExportSpecifier } from "./ExportSpecifier";

export class ExportsList {
  specifiers: ExportSpecifier[] = [];

  constructor(parser: Parser) {
    while (parser.lookahead?.type !== "}") {
      this.specifiers.push(new ExportSpecifier(parser));

      if (parser.lookahead?.type === ",") {
        parser.eat(",");
      }
    }
  }
}
