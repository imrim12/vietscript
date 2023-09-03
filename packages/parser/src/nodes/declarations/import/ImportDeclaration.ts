import { Keyword } from "@vietscript/shared";
import { Parser } from "@parser/parser";

import { StringLiteral } from "../../literals/StringLiteral";

import { ImportSpecifier } from "./ImportSpecifier";
import { ImportClause } from "./ImportClause";
import { ImportDefaultSpecifier } from "./ImportDefaultSpecifier";
import { ImportNamespaceSpecifier } from "./ImportNamespaceSpecifier";

export class ImportDeclaration {
  type = "ImportDeclaration";

  specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier> = [];

  source: StringLiteral;

  assertions = [];

  importType?: "value";

  constructor(parser: Parser) {
    parser.eat(Keyword.IMPORT);

    if (
      parser.lookahead?.type === Keyword.IDENTIFIER ||
      parser.lookahead?.type === "*" ||
      parser.lookahead?.type === "{"
    ) {
      this.importType = "value";

      this.specifiers = new ImportClause(parser).specifiers;

      parser.eat(Keyword.FROM);
    }

    this.source = new StringLiteral(parser);
  }
}
