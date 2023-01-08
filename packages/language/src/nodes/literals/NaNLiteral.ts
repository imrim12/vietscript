import { Parser } from "@lang/parser";
import { BaseAtsNode } from "@lang/nodes/BaseAtsNode";

export class NaNLiteral extends BaseAtsNode<number> {
  constructor(parser: Parser) {
    super();
    parser.eat("NAN");

    this.value = Number.NaN;
    this.node = {
      type: "NaNLiteral",
      value: this.value,
    };
  }
}
