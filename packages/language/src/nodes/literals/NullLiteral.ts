import { Parser } from "@lang/parser";

export class NullLiteral {
  node: {
    type: "NullLiteral";
    value: null;
    raw: string;
  };

  constructor(parser: Parser) {
    parser.eat("Null");

    this.node = {
      type: "NullLiteral",
      value: null,
      raw: "null",
    };
  }
}
