import { Keyword } from "@vietscript/shared";
import { Parser } from "@parser/parser";

export class DebuggerStatement {
  type = "DebuggerStatement";

  constructor(parser: Parser) {
    parser.eat(Keyword.DEBUGGER);
  }
}
