import { Parser } from "@parser/parser";

import { Identifier } from "../identifier/Identifier";

import { Statement } from "./Statement";
import { BlockStatement } from "./BlockStatement";

export class LabelledStatement {
  type = "LabeledStatement";

  label: Identifier;

  body: Statement | BlockStatement;

  constructor(parser: Parser, identifier: Identifier) {
    this.label = identifier;

    parser.eat(":");

    this.body = parser.lookahead?.type === "{" ? new BlockStatement(parser) : new Statement(parser);
  }
}
