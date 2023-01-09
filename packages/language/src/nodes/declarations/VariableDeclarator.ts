import { Parser } from "@lang/parser";
import { Literal } from "@lang/nodes/literals/Literal";

export class VariableDeclarator {
  node: {
    type: "VariableDeclarator";
    id: {
      type: "Identifier";
      name: string;
    };
    init: Literal["node"];
  };

  constructor(parser: Parser) {
    const identifier = parser.eat("Identifier");

    let init: Literal["node"] = {
      type: "Literal",
      value: undefined,
      raw: "undefined",
    };

    if (parser.lookahead?.type === "=") {
      parser.eat("=");

      init = new Literal(parser).node;
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
