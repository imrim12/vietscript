import { Parser } from "@lang/parser";
import { Expression } from "@lang/nodes/expressions/Expression";
import { Identifier } from "@lang/nodes/identifier/Identifier";

export class VariableDeclarator {
  type = "VariableDeclarator";

  id: Identifier;

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

    this.id = {
      type: "Identifier",
      name: String(identifier.value),
    };
    this.init = init;
  }
}
