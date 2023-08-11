import { Parser } from "@parser/parser";

import { DoWhileStatement } from "./DoWhileStatement";
import { WhileStatement } from "./WhileStatement";
import { ForStatement } from "./ForStatement";

export class IterationStatement {
  [key: string]: any;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case "Do": {
        Object.assign(this, new DoWhileStatement(parser));
        break;
      }
      case "While": {
        Object.assign(this, new WhileStatement(parser));
        break;
      }
      case "For": {
        Object.assign(this, new ForStatement(parser));
        break;
      }
    }
  }
}
