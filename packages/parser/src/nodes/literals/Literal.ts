import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

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
      case Keyword.NUMBER: {
        literal = new NumericLiteral(parser);
        break;
      }
      case Keyword.STRING: {
        literal = new StringLiteral(parser);
        break;
      }
      case Keyword.BOOLEAN: {
        literal = new BooleanLiteral(parser);
        break;
      }
      case Keyword.NAN: {
        literal = new NaNLiteral(parser);
        break;
      }
      case Keyword.NULL: {
        literal = new NullLiteral(parser);
        break;
      }
      case Keyword.UNDEFINED: {
        literal = new UndefinedLiteral(parser);
        break;
      }
    }

    this.value = literal.value;
    this.raw = literal.raw;
  }
}
