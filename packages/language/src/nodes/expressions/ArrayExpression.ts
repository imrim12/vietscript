import { Parser } from "@lang/parser";
import { Literal } from "@lang/nodes/literals/Literal";

export class ArrayExpression {
  node: {
    type: "ArrayExpression";
    elements: Array<Literal["node"]["value"]>;
  };

  constructor(parser: Parser) {
    const elements: Array<Literal["node"]["value"]> = [];

    parser.eat("[");

    do {
      elements.push(new Literal(parser).node.value);
    } while (parser.lookahead?.type === "," && parser.eat(","));

    parser.eat("]");

    this.node = {
      type: "ArrayExpression",
      elements,
    };
  }
}
