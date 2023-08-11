import { Parser } from "@lang/parser";

import { BooleanLiteral } from "./BooleanLiteral";
import { NaNLiteral } from "./NaNLiteral";
import { NullLiteral } from "./NullLiteral";
import { NumericLiteral } from "./NumericLiteral";
import { StringLiteral } from "./StringLiteral";
import { UndefinedLiteral } from "./UndefinedLiteral";

export class Literal {
  type = "Literal";

  value: number | boolean | string | null | undefined;

  raw: string;

  constructor(parser: Parser) {
    let literal: any;

    switch (parser.lookahead?.type) {
      case "Number": {
        literal = new NumericLiteral(parser);
        break;
      }
      case "String": {
        literal = new StringLiteral(parser);
        break;
      }
      case "Boolean": {
        literal = new BooleanLiteral(parser);
        break;
      }
      case "NaN": {
        literal = new NaNLiteral(parser);
        break;
      }
      case "Null": {
        literal = new NullLiteral(parser);
        break;
      }
      case "Undefined": {
        literal = new UndefinedLiteral(parser);
        break;
      }
    }

    this.value = literal.value;
    this.raw = literal.raw;
  }
}
