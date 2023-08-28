import { Parser } from "@parser/parser";
import { Identifier } from "@parser/nodes/identifier/Identifier";

export class ExportSpecifier {
  type = "ExportSpecifier";

  local: Identifier;

  exported: Identifier;

  constructor(parser: Parser) {
    this.local = new Identifier(parser);

    if (parser.lookahead?.type === ":") {
      parser.eat(":");
      this.exported = new Identifier(parser);
    } else {
      this.exported = this.local;
    }
  }
}
