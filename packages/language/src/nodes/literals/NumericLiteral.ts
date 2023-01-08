import { Parser } from "@lang/parser";
import { BaseAtsNode } from "@lang/nodes/BaseAtsNode";

export class NumericLiteral extends BaseAtsNode<number> {
  constructor(parser: Parser) {
    super();
    const token = parser.eat("NUMBER");

    this.value = Number(token.value);
    this.node = {
      type: "NumericLiteral",
      value: this.value,
    };
  }
}
