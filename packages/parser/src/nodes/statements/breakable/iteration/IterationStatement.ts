import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

import { DoWhileStatement } from "./DoWhileStatement";
import { WhileStatement } from "./WhileStatement";
import { ForStatement } from "./ForStatement";

export class IterationStatement {
  [key: string]: any;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case Keyword.DO: {
        Object.assign(this, new DoWhileStatement(parser));
        break;
      }
      case Keyword.WHILE: {
        Object.assign(this, new WhileStatement(parser));
        break;
      }
      case Keyword.FOR: {
        Object.assign(this, new ForStatement(parser));
        break;
      }
    }
  }
}
