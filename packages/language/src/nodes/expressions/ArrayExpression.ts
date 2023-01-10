import { Parser } from "@lang/parser";
import { Literal } from "@lang/nodes/literals/Literal";

export class ArrayExpression {
  type: "ArrayExpression";

  elements: Array<Literal["value"]>;

  constructor(parser: Parser) {
    const elements: Array<Literal["value"]> = [];

    parser.eat("[");

    do {
      elements.push(new Literal(parser).value);
    } while (parser.lookahead?.type === "," && parser.eat(","));

    parser.eat("]");

    this.type = "ArrayExpression";
    this.elements = elements;
  }
}
