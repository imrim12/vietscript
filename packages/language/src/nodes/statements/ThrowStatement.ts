import { Parser } from "@lang/parser";

import { Expression } from "../expressions/Expression";

export class ThrowStatement {
  node: {
    type: "ThrowStatement";
    argument: Expression["node"];
  };

  constructor(parser: Parser) {
    parser.eat("Throw");

    const expression = new Expression(parser).node;

    this.node = {
      type: "ThrowStatement",
      argument: expression,
    };
  }
}
