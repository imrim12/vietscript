import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

import { VariableDeclarator } from "./VariableDeclarator";

export class VariableDeclaration {
  type = "VariableDeclaration";

  declarations: Array<VariableDeclarator>;

  kind: "var" | "let" | "const";

  constructor(parser: Parser) {
    let kind: "var" | "let" | "const" = "var";
    let isConstant = false;

    switch (parser.lookahead?.type) {
      case Keyword.VAR: {
        parser.eat(Keyword.VAR);
        kind = "var";

        break;
      }
      case Keyword.LET: {
        parser.eat(Keyword.LET);
        kind = "let";

        break;
      }
      case Keyword.CONST: {
        parser.eat(Keyword.CONST);
        kind = "const";
        isConstant = true;

        break;
      }
      default: {
        throw new SyntaxError(`Unexpected token: "${parser.lookahead?.value}", expected a variable declarator!`);
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
