import { Parser } from "@lang/parser";
import { BaseAtsNode } from "@lang/nodes/BaseAtsNode";

export class NullLiteral extends BaseAtsNode<null> {
  constructor(parser: Parser) {
    super();
    parser.eat("NULL");

    this.value = null;
    this.node = {
      type: "NullLiteral",
      value: this.value,
    };
  }
}
