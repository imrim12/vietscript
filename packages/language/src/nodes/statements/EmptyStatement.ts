import { Parser } from "@lang/parser";

export class EmptyStatement {
  node: {
    type: "EmptyStatement";
  };

  constructor(parser: Parser) {
    parser.eat(";");

    this.node = {
      type: "EmptyStatement",
    };
  }
}
