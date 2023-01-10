import { Parser } from "@lang/parser";

import { Expression } from "../expressions/Expression";

export class VariableDeclarator {
  type: "VariableDeclarator";

  id: {
    type: "Identifier";
    name: string;
  };

  init: Expression;

  constructor(parser: Parser, isConstant = false) {
    const identifier = parser.eat("Identifier");

    let init: VariableDeclarator["init"] = {
      type: "Literal",

      raw: "undefined",
    };

    if (isConstant || parser.lookahead?.type === "=") {
      parser.eat("=");

      init = new Expression(parser);
    }

    this.type = "VariableDeclarator";
    this.id = {
      type: "Identifier",
      name: String(identifier.value),
    };
    this.init = init;
  }
}
