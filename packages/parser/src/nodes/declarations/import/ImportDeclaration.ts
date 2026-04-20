import { Keyword } from "@vietscript/shared";
import { Parser } from "@parser/parser";

import { StringLiteral } from "../../literals/StringLiteral";
import { Expression } from "../../expressions/Expression";

import { ImportSpecifier } from "./ImportSpecifier";
import { ImportClause } from "./ImportClause";
import { ImportDefaultSpecifier } from "./ImportDefaultSpecifier";
import { ImportNamespaceSpecifier } from "./ImportNamespaceSpecifier";

export class ImportDeclaration {
  [key: string]: any;

  type = "ImportDeclaration";

  specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier> = [];

  source!: StringLiteral;

  assertions: any[] = [];

  importType?: "value";

  constructor(parser: Parser) {
    parser.eat(Keyword.IMPORT);

    if (parser.lookahead?.type === "(") {
      parser.eat("(");
      const argument = new Expression(parser);
      parser.eat(")");
      Object.assign(this, {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: { type: "Import" },
          arguments: [argument],
        },
      });
      return;
    }

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
