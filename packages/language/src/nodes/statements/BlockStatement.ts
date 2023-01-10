import { Parser } from "@lang/parser";

import { Statement } from "./Statement";

export class BlockStatement {
  node: {
    type: "BlockStatement";
    body: Array<Statement["node"]>;
  };

  constructor(parser: Parser) {
    const statements: Array<Statement["node"]> = [];

    parser.eat("{");

    // List of statement
    while (parser.lookahead?.type !== "}") {
      statements.push(new Statement(parser).node);
    }

    parser.eat("}");

    this.node = {
      type: "BlockStatement",
      body: statements,
    };
  }
}
