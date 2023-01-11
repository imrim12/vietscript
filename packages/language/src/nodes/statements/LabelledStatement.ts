import { Parser } from "@lang/parser";

import { IterationStatement } from "./breakable/iteration/IterationStatement";

export class LabelledStatement {
  type: "LabelledStatement";

  label: {
    type: "Identifier";
    name: "loop";
  };

  body: IterationStatement;

  constructor(parser: Parser) {
    parser.eat("Identifier");

    parser.eat(":");

    this.body = new IterationStatement(parser);

    this.type = "LabelledStatement";
  }
}
