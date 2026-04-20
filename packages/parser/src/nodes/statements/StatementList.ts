import { Parser } from "@parser/parser";

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
      const beforeToken = parser.lookahead;
      const statement = new StatementListItem(parser);

      if (parser.lookahead === beforeToken && parser.lookahead !== null) {
        throw new SyntaxError(`Unexpected token: "${parser.lookahead?.value}" không thể bắt đầu một câu lệnh`);
      }

      if (statement !== undefined && Object.keys(statement).length > 0) {
        statements.push(statement);
      }

      if (parser.lookahead?.type === ";") {
        parser.eat(";");
      }

      while (parser.lookahead?.type === ";") {
        statements.push(new EmptyStatement(parser));
      }
    }

    this.body = statements;
  }
}
