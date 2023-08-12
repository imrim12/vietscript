import { Parser } from "@parser/parser";

import { Expression } from "../expressions/Expression";
import { ArrayElementList } from "../initializers/array/ArrayElementList";

export class ArrayLiteral {
  type = "ArrayLiteral";

  elements: Array<Expression>;

  constructor(parser: Parser) {
    parser.eat("[");

    this.elements = new ArrayElementList(parser, "]").elements;

    parser.eat("]");
  }
}
