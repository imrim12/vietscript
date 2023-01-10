import { Parser } from "@lang/parser";

import { Statement } from "./statements/Statement";
import { EmptyStatement } from "./statements/EmptyStatement";

export class Program {
  type: "Program";

  body: Array<Statement>;

  constructor(parser: Parser) {
    const statements: Array<Statement> = [];

    while (parser.tokenizer.isEOF() === false) {
      const statement = new Statement(parser);

      if (statement !== undefined) {
        statements.push(statement);
      }

      // Eat the first ";" after every statement
      if (parser.lookahead?.type === ";") {
        parser.eat(";");
      }

      // The rest would be empty statements
      while (parser.lookahead?.type === ";") {
        statements.push(new EmptyStatement(parser));
      }
    }

    this.type = "Program";
    this.body = statements;
  }
}
