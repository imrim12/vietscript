import { Parser } from "@lang";

import { Identifier } from "../identifier/Identifier";

import { Expression } from "./Expression";

export class MemberExpression {
  type = "MemberExpression";

  object: Expression;

  property: Expression | null = null;

  computed = false;

  optional = false;

  constructor(parser: Parser, object: Expression) {
    this.object = object;

    do {
      switch (parser.lookahead?.type) {
        case "[": {
          parser.eat("[");
          this.object = this.property ? { ...this } : { ...this.object };
          this.property = new Expression(parser);

          parser.eat("]");

          this.computed = true;

          break;
        }
        case ".": {
          parser.eat(".");
          this.object = this.property ? { ...this } : { ...this.object };
          this.property = new Identifier(parser);

          this.computed = false;

          break;
        }
      }
    } while (parser.lookahead?.type === "." || parser.lookahead?.type === "[");
  }
}
