import { Parser } from "@parser/parser";

export class WithStatement {
  type = "WithStatement";

  constructor(parser: Parser) {
    parser.eat("With");
  }
}
