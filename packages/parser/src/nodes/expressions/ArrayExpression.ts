import { Parser } from "@parser/parser";

import { ArrayLiteral } from "../literals/ArrayLiteral";

import { Expression } from "./Expression";

export class ArrayExpression {
  type = "ArrayExpression";

  elements: Array<Expression>;

  constructor(parser: Parser) {
    this.elements = new ArrayLiteral(parser).elements;
  }
}
