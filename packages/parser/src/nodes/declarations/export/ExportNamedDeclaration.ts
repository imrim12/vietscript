import { Keyword } from "@vietscript/shared";
import { Parser } from "@parser/parser";

import { ExportSpecifier } from "./ExportSpecifier";
import { StringLiteral } from "@parser/nodes/literals/StringLiteral";

export class ExportNamedDeclaration {
  type = "ExportNamedDeclaration";

  specifiers: ExportSpecifier[] = [];

  source: StringLiteral;

  constructor(parser: Parser) {
    parser.eat(Keyword.EXPORT);

    parser.eat("{");

    while (parser.lookahead?.type !== "}") {
      this.specifiers.push(new ExportSpecifier(parser));

      if (parser.lookahead?.type === ",") {
        parser.eat(",");
      }
    }

    parser.eat("}");

    if (parser.lookahead?.type === Keyword.FROM) {
      parser.eat(Keyword.FROM);

      this.source = new StringLiteral(parser);
    }
  }
}
