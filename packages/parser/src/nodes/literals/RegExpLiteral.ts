import { Parser } from "@parser/parser";

export class RegExpLiteral {
  type = "RegExpLiteral";

  pattern: string;

  flags: string;

  constructor(parser: Parser) {
    const token = parser.eat("RegExpLiteral");
    const raw = String(token?.value);
    const lastSlash = raw.lastIndexOf("/");
    this.pattern = raw.slice(1, lastSlash);
    this.flags = raw.slice(lastSlash + 1);
  }
}
