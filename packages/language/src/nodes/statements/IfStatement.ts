import { Parser } from "@lang/parser";

export class IfStatement {
  constructor(parser: Parser) {
    parser.eat("If");
  }
}
