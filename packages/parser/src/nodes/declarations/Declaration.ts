import { Parser } from "@parser/parser";

import { ClassDeclaration } from "./ClassDeclaration";
import { FunctionDeclaration } from "./FunctionDeclaration";
import { VariableDeclaration } from "./VariableDeclaration";

export class Declaration {
  [key: string]: any;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case "Var":
      case "Let":
      case "Const": {
        Object.assign(this, new VariableDeclaration(parser));
        break;
      }
      case "Async":
      case "Function": {
        Object.assign(this, new FunctionDeclaration(parser));
        break;
      }
      case "Class": {
        Object.assign(this, new ClassDeclaration(parser));
        break;
      }
    }
  }
}
