import { Parser } from "@lang/parser";

import { Statement } from "./Statement";

export class BlockStatement {
  type: "BlockStatement";

  body: Array<Statement>;

  constructor(parser: Parser) {
    const statements: Array<Statement> = [];

    parser.eat("{");

    // List of statement
    while (parser.lookahead?.type !== "}") {
      statements.push(new Statement(parser));
    }

    parser.eat("}");

    this.type = "BlockStatement";
    this.body = statements;
  }
}
