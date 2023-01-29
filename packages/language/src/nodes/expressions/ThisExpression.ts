import { Parser } from "@lang/parser";

export class ThisExpression {
  type = "ThisExpression";

  constructor(parser: Parser) {
    parser.eat("This");
  }
}
