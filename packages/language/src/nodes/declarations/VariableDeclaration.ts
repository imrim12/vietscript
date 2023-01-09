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

    switch (parser.lookahead?.type) {
      case "VAR": {
        parser.eat("VAR");
        kind = "var";

        break;
      }
      case "LET": {
        parser.eat("LET");
        kind = "let";

        break;
      }
      case "CONST": {
        parser.eat("CONST");
        kind = "const";

        break;
      }
    }

    const declarations: Array<VariableDeclarator["node"]> = [];

    do {
      declarations.push(new VariableDeclarator(parser).node);
    } while (parser.lookahead?.type === "," && parser.eat(","));

    this.node = {
      type: "VariableDeclaration",
      declarations,
      kind,
    };
  }
}
