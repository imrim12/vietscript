import { Parser } from "@lang/parser";

import { Expression } from "../expressions/Expression";

export class ReturnStatement {
  node: {
    type: "ReturnStatement";
    argument: Expression["node"];
  };

  constructor(parser: Parser) {
    parser.eat("Return");

    const expression = new Expression(parser).node;

    this.node = {
      type: "ReturnStatement",
      argument: expression,
    };
  }
}
