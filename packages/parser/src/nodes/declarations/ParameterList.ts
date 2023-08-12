import { Parser } from "@parser/parser";

import { Identifier } from "../identifier/Identifier";

export class ParameterList {
  parameters: Array<Identifier> = [];

  constructor(parser: Parser, stopToken = ")") {
    while (parser.lookahead?.type !== stopToken) {
      this.parameters.push(new Identifier(parser));

      if (parser.lookahead?.type !== stopToken) {
        parser.eat(",");
      }
    }
  }
}
