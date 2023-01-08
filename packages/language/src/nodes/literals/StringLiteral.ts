import { Parser } from "@lang/parser";
import { BaseAtsNode } from "@lang/nodes/BaseAtsNode";

export class StringLiteral extends BaseAtsNode<string> {
  constructor(parser: Parser) {
    super();
    const token = parser.eat("STRING");

    this.value = String(token.value).slice(1, -1);
    this.node = {
      type: "StringLiteral",
      value: this.value,
    };
  }
}
