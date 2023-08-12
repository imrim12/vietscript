import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

import { ClassDeclaration } from "./ClassDeclaration";
import { FunctionDeclaration } from "./FunctionDeclaration";
import { VariableDeclaration } from "./VariableDeclaration";

export class Declaration {
  [key: string]: any;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case Keyword.VAR:
      case Keyword.LET:
      case Keyword.CONST: {
        Object.assign(this, new VariableDeclaration(parser));
        break;
      }
      case Keyword.ASYNC:
      case Keyword.FUNCTION: {
        Object.assign(this, new FunctionDeclaration(parser));
        break;
      }
      case Keyword.CLASS: {
        Object.assign(this, new ClassDeclaration(parser));
        break;
      }
    }
  }
}
