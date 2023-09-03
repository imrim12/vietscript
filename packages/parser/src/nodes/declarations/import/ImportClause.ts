import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

import { ImportNamespaceSpecifier } from "./ImportNamespaceSpecifier";
import { ImportDefaultSpecifier } from "./ImportDefaultSpecifier";
import { ImportSpecifier } from "./ImportSpecifier";
import { ImportsList } from "./ImportsList";

export class ImportClause {
  specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier> = [];

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case "*": {
        this.specifiers = [new ImportNamespaceSpecifier(parser)];
        break;
      }
      case "{": {
        parser.eat("{");
        this.specifiers = new ImportsList(parser).specifiers;
        parser.eat("}");

        // @ts-expect-error
        if (parser.lookahead?.type === ",") {
          parser.eat(",");
          parser.eat("{");
          this.specifiers.push(new ImportDefaultSpecifier(parser));
          parser.eat("}");
        }
        break;
      }
      case Keyword.IDENTIFIER: {
        this.specifiers = [new ImportDefaultSpecifier(parser)];

        // @ts-expect-error
        if (parser.lookahead?.type === ",") {
          parser.eat(",");
          parser.eat("{");
          this.specifiers.push(...new ImportsList(parser).specifiers);
          parser.eat("}");
        }
        break;
      }
    }
  }
}
