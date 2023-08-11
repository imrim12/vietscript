import { Parser } from "@lang/parser";
import { Expression } from "@lang/nodes/expressions/Expression";
import { Identifier } from "@lang/nodes/identifier/Identifier";

export class VariableDeclarator {
  type = "VariableDeclarator";

  id: Identifier;

  init: Expression = {
    type: "Literal",
    raw: "undefined",
  };

  constructor(parser: Parser, isConstant = false) {
    const identifier = new Identifier(parser);

    if (isConstant || parser.lookahead?.type === "=") {
      parser.eat("=");

      this.init = new Expression(parser);
    }

    this.id = identifier;
  }
}
