import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

import { BooleanLiteral } from "./BooleanLiteral";
import { NaNIdentifier } from "./NaNIdentifier";
import { NullLiteral } from "./NullLiteral";
import { NumericLiteral } from "./NumericLiteral";
import { StringLiteral } from "./StringLiteral";
import { UndefinedIdentifier } from "./UndefinedIdentifier";

export class Literal {
  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case Keyword.NUMBER: {
        Object.assign(this, new NumericLiteral(parser));
        break;
      }
      case Keyword.STRING: {
        Object.assign(this, new StringLiteral(parser));
        break;
      }
      case Keyword.BOOLEAN: {
        Object.assign(this, new BooleanLiteral(parser));
        break;
      }
      case Keyword.NULL: {
        Object.assign(this, new NullLiteral(parser));
        break;
      }
      case Keyword.NAN: {
        Object.assign(this, new NaNIdentifier(parser));
        break;
      }
      case Keyword.UNDEFINED: {
        Object.assign(this, new UndefinedIdentifier(parser));
        break;
      }
    }
  }
}
