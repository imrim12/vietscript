import { Parser } from "@lang/parser";

import { VariableDeclarator } from "./VariableDeclarator";

export class VariableDeclaration {
  node: {
    type: "VariableDeclaration";
    declarations: Array<VariableDeclarator["node"]>;
    kind: "var" | "let" | "const";
  };

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

    const declarations: Array<VariableDeclarator["node"]> = [];

    do {
      declarations.push(new VariableDeclarator(parser, isConstant).node);
    } while (parser.lookahead?.type === "," && parser.eat(","));

    this.node = {
      type: "VariableDeclaration",
      declarations,
      kind,
    };
  }
}
