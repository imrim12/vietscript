import { Parser } from "@lang/parser";

export class Identifier {
  type = "Identifier" as const;

  name: string;

  constructor(parser: Parser) {
    this.name = String(parser.eat("Identifier").value);
  }
}
