import { Parser } from "@lang/parser";

import { VariableDeclarator } from "./VariableDeclarator";

export class VariableDeclaration {
  type: "VariableDeclaration";

  declarations: Array<VariableDeclarator>;

  kind: "var" | "let" | "const";

  constructor(parser: Parser) {
    let kind: "var" | "let" | "const" = "var";
    let isConstant = false;

    switch (parser.lookahead?.type) {
      case "Var": {
        parser.eat("Var");
        kind = "var";

        break;
      }
      case "Let": {
        parser.eat("Let");
        kind = "let";

        break;
      }
      case "Const": {
        parser.eat("Const");
        kind = "const";
        isConstant = true;

        break;
      }
    }

    const declarations: Array<VariableDeclarator> = [];

    do {
      declarations.push(new VariableDeclarator(parser, isConstant));
    } while (parser.lookahead?.type === "," && parser.eat(","));

    this.type = "VariableDeclaration";
    this.declarations = declarations;
    this.kind = kind;
  }
}
