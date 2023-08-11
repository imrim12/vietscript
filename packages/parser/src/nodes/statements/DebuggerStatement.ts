import { Parser } from "@parser/parser";

export class DebuggerStatement {
  type = "DebuggerStatement";

  constructor(parser: Parser) {
    parser.eat("Debugger");
  }
}
