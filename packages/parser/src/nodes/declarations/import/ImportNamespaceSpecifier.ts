import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

export class ImportNamespaceSpecifier {
  type: "ImportNamespaceSpecifier";

  local: Identifier;

  constructor(parser: Parser) {
    parser.eat("*");

    parser.eat(Keyword.AS);

    this.local = new Identifier(parser);
  }
}
