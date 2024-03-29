import { Parser } from "@parser/parser";

import { StatementList } from "./StatementList";
import { StatementListItem } from "./StatementListItem";

export class BlockStatement {
  type = "BlockStatement";

  body: Array<StatementListItem>;

  directives: Array<any> = [];

  constructor(parser: Parser) {
    const statements: Array<StatementListItem> = [];

    parser.eat("{");

    // List of statement
    statements.push(...new StatementList(parser, ["}"]).body);

    parser.eat("}");

    this.body = statements;
  }
}
