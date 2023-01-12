import { Parser } from "@lang/parser";

export class WithStatement {
  type = "WithStatement";

  constructor(parser: Parser) {
    parser.eat("With");
  }
}
