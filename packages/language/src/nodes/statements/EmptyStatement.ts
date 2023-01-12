import { Parser } from "@lang/parser";

export class EmptyStatement {
  type = "EmptyStatement";

  constructor(parser: Parser) {
    parser.eat(";");
  }
}
