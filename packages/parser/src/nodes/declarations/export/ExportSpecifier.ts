import { Keyword } from "@vietscript/shared";
import { Parser } from "@parser/parser";
import { Identifier } from "@parser/nodes/identifier/Identifier";

export class ExportSpecifier {
  type = "ExportSpecifier";

  local: Identifier;

  exported: Identifier;

  constructor(parser: Parser) {
    this.local = new Identifier(parser);

    if (parser.lookahead?.type === Keyword.AS) {
      parser.eat(Keyword.AS);
      this.exported = new Identifier(parser);
    }
  }
}
