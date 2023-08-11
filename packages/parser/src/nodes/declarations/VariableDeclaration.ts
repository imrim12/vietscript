import { Parser } from "@parser/parser";

import { VariableDeclarator } from "./VariableDeclarator";

export class VariableDeclaration {
  type = "VariableDeclaration";

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
      default: {
        throw new SyntaxError(`Unexpected token: "${parser.lookahead?.value}", expected a variable declarator!`)
      }
    }

    const declarations: Array<VariableDeclarator> = [];

    do {
      declarations.push(new VariableDeclarator(parser, isConstant));
      // @ts-expect-error no overlap
    } while (parser.lookahead?.type === "," && parser.eat(","));

    this.declarations = declarations;
    this.kind = kind;
  }
}
