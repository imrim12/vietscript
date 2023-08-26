import { Keyword } from "@vietscript/shared";
import { Parser } from "@parser/parser";

import { ExportAllDeclaration } from "./ExportAllDeclaration";
import { ExportNamedDeclaration } from "./ExportNamedDeclaration";
import { ExportDefaultDeclaration } from "./ExportDefaultDeclaration";

export class ExportDeclaration {
  constructor(parser: Parser) {
    if (parser.lookahead?.type === Keyword.EXPORT) {
      parser.eat(Keyword.EXPORT);
    }

    switch (parser.lookahead?.type) {
      case "*": {
        Object.assign(this, new ExportAllDeclaration(parser));
        break;
      }
      case "{": {
        Object.assign(this, new ExportNamedDeclaration(parser));
        break;
      }
      case Keyword.DEFAULT: {
        Object.assign(this, new ExportDefaultDeclaration(parser));
        break;
      }
    }
  }
}
