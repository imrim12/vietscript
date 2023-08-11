import { Parser } from "@parser/parser";
import { Literal } from "@parser/nodes/literals/Literal";

export class ArrayExpression {
  type = "ArrayExpression";

  elements: Array<Literal["value"]>;

  constructor(parser: Parser) {
    const elements: Array<Literal["value"]> = [];

    parser.eat("[");

    while (parser.lookahead?.type !== "]") {
      elements.push(new Literal(parser).value);

      if (parser.lookahead?.type !== "]") {
        parser.eat(",");
      }
    }

    parser.eat("]");

    this.elements = elements;
  }
}
