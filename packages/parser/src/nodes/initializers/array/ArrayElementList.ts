import { Parser } from "@parser/parser";

import { Expression } from "../../expressions/Expression";

export class ArrayElementList {
  type = "ArrayElementList";

  elements: Array<Expression> = [];

  constructor(parser: Parser, stopToken = "]") {
    while (parser.lookahead?.type !== stopToken) {
      this.elements.push(new Expression(parser));

      if (parser.lookahead?.type !== stopToken) {
        parser.eat(",");
      }
    }
  }
}
