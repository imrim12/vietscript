import { Parser } from "@parser/parser";

import { Identifier } from "../identifier/Identifier";

import { IterationStatement } from "./breakable/iteration/IterationStatement";

export class LabelledStatement {
  type = "LabelledStatement";

  label: Identifier;

  body: IterationStatement;

  constructor(parser: Parser, identifier: Identifier) {
    this.label = identifier;

    parser.eat(":");

    this.body = new IterationStatement(parser);
  }
}
