import { Keyword } from "@vietscript/shared";
import { Parser } from "@parser/parser";
import { StringLiteral } from "@parser/nodes/literals/StringLiteral";

import { ExportSpecifier } from "./ExportSpecifier";
import { ExportsList } from "./ExportsList";

export class ExportNamedDeclaration {
  type = "ExportNamedDeclaration";

  specifiers: ExportSpecifier[] = [];

  source: StringLiteral;

  constructor(parser: Parser) {
    parser.eat(Keyword.EXPORT);

    parser.eat("{");

    this.specifiers.push(...new ExportsList(parser).specifiers);

    parser.eat("}");

    if (parser.lookahead?.type === Keyword.FROM) {
      parser.eat(Keyword.FROM);

      this.source = new StringLiteral(parser);
    }
  }
}
