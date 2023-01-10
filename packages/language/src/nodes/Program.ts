import { Parser } from "@lang/parser";

import { Statement } from "./statements/Statement";
import { EmptyStatement } from "./statements/EmptyStatement";

export class Program {
  node: {
    type: "Program";
    body: Array<Statement["node"]>;
  };

  constructor(parser: Parser) {
    const statements: Array<Statement["node"]> = [];

    while (parser.tokenizer.isEOF() === false) {
      const statement = new Statement(parser).node;

      if (statement !== undefined) {
        statements.push(statement);
      }

      // Eat the first ";" after every statement
      if (parser.lookahead?.type === ";") {
        parser.eat(";");
      }

      // The rest would be empty statements
      while (parser.lookahead?.type === ";") {
        statements.push(new EmptyStatement(parser).node);
      }
    }

    this.node = {
      type: "Program",
      body: statements,
    };
  }
}
