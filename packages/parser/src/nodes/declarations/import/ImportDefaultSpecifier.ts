import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Parser } from "@parser/parser";

export class ImportDefaultSpecifier {
  type: "ImportDefaultSpecifier";

  local: Identifier;

  constructor(parser: Parser) {
    this.local = new Identifier(parser);
  }
}
