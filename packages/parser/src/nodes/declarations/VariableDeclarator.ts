import { Parser } from "@parser/parser";
import { Expression } from "@parser/nodes/expressions/Expression";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Keyword } from "@vietscript/shared";

export class VariableDeclarator {
  type = "VariableDeclarator";

  id: Identifier;

  init: Expression = {
    type: Keyword.IDENTIFIER,
    name: "undefined",
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
