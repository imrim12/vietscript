import { Parser } from "@parser/parser";

import { Expression } from "./Expression";

export class ConditionalExpression {
  type = "ConditionalExpression";

  test: Expression;

  consequent: Expression;

  alternate: Expression;

  constructor(parser: Parser, test: Expression) {
    this.test = test;
    parser.eat("?");
    parser.ternaryDepth++;
    try {
      this.consequent = new Expression(parser);
    } finally {
      parser.ternaryDepth--;
    }
    parser.eat(":");
    this.alternate = new Expression(parser);
  }
}
