import { Parser } from "@lang/parser";

import { Expression } from "../expressions/Expression";

export class VariableDeclarator {
  node: {
    type: "VariableDeclarator";
    id: {
      type: "Identifier";
      name: string;
    };
    init: Expression["node"];
  };

  constructor(parser: Parser, isConstant = false) {
    const identifier = parser.eat("Identifier");

    let init: VariableDeclarator["node"]["init"] = {
      type: "Literal",
      value: undefined,
      raw: "undefined",
    };

    if (isConstant || parser.lookahead?.type === "=") {
      parser.eat("=");

      init = new Expression(parser).node;
    }

    this.node = {
      type: "VariableDeclarator",
      id: {
        type: "Identifier",
        name: String(identifier.value),
      },
      init,
    };
  }
}
