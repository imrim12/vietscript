import { Parser } from "@lang/parser";

import { EmptyStatement } from "./EmptyStatement";
import { StatementListItem } from "./StatementListItem";

export class StatementList {
  body: Array<StatementListItem>;

  constructor(parser: Parser, stopTokens?: Array<string>) {
    const statements: Array<StatementListItem> = [];

    while (
      parser.tokenizer.isEOF() === false &&
      !stopTokens?.includes(String(parser.lookahead?.type))
    ) {
      const statement = new StatementListItem(parser);

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

    this.body = statements;
  }
}
