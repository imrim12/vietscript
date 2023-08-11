import { Parser } from "@parser/parser";

export class Identifier {
  type = "Identifier" as const;

  name: string;

  constructor(parser: Parser) {
    this.name = String(parser.eat("Identifier")?.value);
  }
}
