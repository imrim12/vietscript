import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

import { SwitchStatement } from "./SwitchStatement";
import { IterationStatement } from "./iteration/IterationStatement";

export class BreakableStatement {
  [key: string]: any;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case Keyword.DO:
      case Keyword.WHILE:
      case Keyword.FOR: {
        Object.assign(this, new IterationStatement(parser));
        break;
      }

      case Keyword.SWITCH: {
        Object.assign(this, new SwitchStatement(parser));
        break;
      }
    }
  }
}
