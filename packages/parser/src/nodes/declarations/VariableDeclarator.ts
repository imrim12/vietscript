import { Parser } from "@parser/parser";
import { Expression } from "@parser/nodes/expressions/Expression";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { ObjectPattern } from "@parser/nodes/patterns/ObjectPattern";
import { ArrayPattern } from "@parser/nodes/patterns/ArrayPattern";

export class VariableDeclarator {
  type = "VariableDeclarator";

  id: Identifier | ObjectPattern | ArrayPattern;

  init: Expression | null = null;

  constructor(parser: Parser, isConstant = false) {
    let id: Identifier | ObjectPattern | ArrayPattern;
    if (parser.lookahead?.type === "{") id = new ObjectPattern(parser);
    else if (parser.lookahead?.type === "[") id = new ArrayPattern(parser);
    else id = new Identifier(parser);

    if (parser.lookahead?.type === "=") {
      parser.eat("=");
      this.init = new Expression(parser);
    }

    this.id = id;
  }
}
