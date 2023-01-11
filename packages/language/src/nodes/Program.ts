import { Parser } from "@lang/parser";

import { Statement } from "./statements/Statement";
import { StatementList } from "./statements/StatementList";

export class Program {
  type: "Program";

  body: Array<Statement>;

  constructor(parser: Parser) {
    this.type = "Program";
    this.body = new StatementList(parser).body;
  }
}
