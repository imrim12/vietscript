import { Parser } from "@lang/parser";

export class WithStatement {
  constructor(parser: Parser) {
    parser.eat("With");
  }
}
