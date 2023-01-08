import { Parser } from "@lang/parser";
import { BaseAtsNode } from "@lang/nodes/BaseAtsNode";

export class UndefinedLiteral extends BaseAtsNode<undefined> {
  constructor(parser: Parser) {
    super();
    parser.eat("UNDEFINED");

    this.value = undefined;
    this.node = {
      type: "UndefinedLiteral",
      value: this.value,
    };
  }
}
