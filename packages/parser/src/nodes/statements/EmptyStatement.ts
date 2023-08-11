import { Parser } from "@parser/parser";

export class EmptyStatement {
  type = "EmptyStatement";

  constructor(parser: Parser) {
    parser.eat(";");
  }
}
