import { Parser } from "@parser/parser";

import { Identifier } from "./Identifier";

export class PrivateName {
  type = "PrivateName";

  id: Identifier;

  constructor(parser: Parser) {
    parser.eat("#");
    this.id = new Identifier(parser);
  }
}
