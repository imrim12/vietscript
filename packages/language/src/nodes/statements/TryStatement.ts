import { Parser } from "@lang/parser";

export class TryStatement {
  type = "TryStatement";

  constructor(parser: Parser) {
    parser.eat("Try");
  }
}
