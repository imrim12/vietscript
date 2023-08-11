import { Parser } from "@parser/parser";

import { SwitchStatement } from "./SwitchStatement";
import { IterationStatement } from "./iteration/IterationStatement";

export class BreakableStatement {
  [key: string]: any;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case "Do":
      case "While":
      case "For": {
        Object.assign(this, new IterationStatement(parser));
        break;
      }

      case "Switch": {
        Object.assign(this, new SwitchStatement(parser));
        break;
      }
    }
  }
}
