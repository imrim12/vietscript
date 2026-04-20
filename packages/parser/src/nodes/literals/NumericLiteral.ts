import { Parser } from "@parser/parser";
import { Keyword, Node } from "@vietscript/shared";

export class NumericLiteral implements Node {
  type = "NumericLiteral";

  value: number | string = 0;

  extra: {
    rawValue: number | string;
    raw: string;
  };

  start: number;

  end: number;

  constructor(parser: Parser) {
    const token = parser.eat(Keyword.NUMBER);
    const raw = String(token.value);

    this.start = token.start;
    this.end = token.end;

    if (raw.endsWith("n")) {
      this.type = "BigIntLiteral";
      const clean = raw.slice(0, -1).replace(/_/g, "");
      this.value = clean;
      this.extra = { rawValue: clean, raw };
    } else {
      const clean = raw.replace(/_/g, "");
      this.value = Number(clean);
      this.extra = { rawValue: this.value, raw };
    }
  }
}
