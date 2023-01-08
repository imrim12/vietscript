import { Parser } from "@lang/parser";
import { BaseAtsNode } from "@lang/nodes/BaseAtsNode";

export class BooleanLiteral extends BaseAtsNode<boolean> {
  constructor(parser: Parser) {
    super();

    const token = parser.eat("BOOLEAN");

    this.value = token.value === "TRUE" ? true : false;
    this.node = {
      type: "BooleanLiteral",
      value: this.value,
    };
  }
}
