import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

export class ImportNamespaceSpecifier {
  type = "ImportNamespaceSpecifier";

  local: Identifier;

  constructor(parser: Parser) {
    parser.eat("*");

    parser.eat(Keyword.AS);

    if (typeof parser.lookahead?.value === "string") {
      const fromToken = /\s+từ$/g.exec(parser.lookahead.value)?.[0];

      if (fromToken) {
        parser.tokenizer.rollback(fromToken.length);

        parser.lookahead.value = parser.lookahead.value.replace(/\s+từ$/g, "");
      }
    }

    this.local = new Identifier(parser);
  }
}
