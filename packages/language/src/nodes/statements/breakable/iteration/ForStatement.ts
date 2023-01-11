import { Parser } from "@lang/parser";

export class ForStatement {
  constructor(parser: Parser) {
    parser.eat("For");
  }
}
