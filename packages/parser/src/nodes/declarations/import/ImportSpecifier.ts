import { Parser } from "@parser/parser";
import { Identifier } from "@parser/nodes/identifier/Identifier";

export class ImportSpecifier {
  type = "ImportSpecifier";

  imported: Identifier;

  local: Identifier;

  constructor(parser: Parser) {
    this.imported = new Identifier(parser);

    if (parser.lookahead?.type === ":") {
      parser.eat(":");

      this.local = new Identifier(parser);
    } else {
      this.local = this.imported;
    }
  }
}
