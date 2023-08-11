import { Parser } from "@parser/parser";

import { Statement } from "./statements/Statement";
import { StatementList } from "./statements/StatementList";

export class Program {
  type = "Program";

  body: Array<Statement>;

  constructor(parser: Parser) {
    this.body = new StatementList(parser).body;
  }
}
