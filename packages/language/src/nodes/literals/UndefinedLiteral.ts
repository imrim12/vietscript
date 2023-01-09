import { Parser } from "@lang/parser";

export class UndefinedLiteral {
  node: {
    type: "UndefinedLiteral";
    value: undefined;
    raw: string;
  };

  constructor(parser: Parser) {
    parser.eat("Undefined");

    const value = undefined;

    this.node = {
      type: "UndefinedLiteral",
      value,
      raw: "undefined",
    };
  }
}
