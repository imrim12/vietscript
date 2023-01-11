import { Parser } from "@lang/parser";

export class WhileStatement {
  constructor(parser: Parser) {
    parser.eat("While");
  }
}
