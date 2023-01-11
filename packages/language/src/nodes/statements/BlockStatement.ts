import { Parser } from "@lang/parser";

import { StatementList } from "./StatementList";
import { StatementListItem } from "./StatementListItem";

export class BlockStatement {
  type: "BlockStatement";

  body: Array<StatementListItem>;

  constructor(parser: Parser) {
    const statements: Array<StatementListItem> = [];

    parser.eat("{");

    // List of statement
    statements.push(...new StatementList(parser).body);

    parser.eat("}");

    this.type = "BlockStatement";
    this.body = statements;
  }
}
