import { Parser } from "@lang/parser";

export class DoWhileStatement {
  constructor(parser: Parser) {
    parser.eat("Do");
  }
}
