import { Parser } from "@lang/parser";
import { Literal } from "@lang/nodes/literals/Literal";
import { BaseAtsNode } from "@lang/nodes/BaseAtsNode";

export class ArrayExpression extends BaseAtsNode<Array<any>> {
  constructor(parser: Parser) {
    super();

    const elements = [];

    parser.eat("[");

    do {
      elements.push(new Literal(parser).value);
    } while (parser.lookahead?.type === "," && parser.eat(","));

    parser.eat("]");

    this.value = elements;
    this.node = {
      type: "ArrayExpression",
      elements: this.value,
    };
  }
}
