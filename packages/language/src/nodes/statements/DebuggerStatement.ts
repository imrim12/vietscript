import { Parser } from "@lang/parser";

export class DebuggerStatement {
  type: "DebuggerStatement";

  constructor(parser: Parser) {
    parser.eat("Debugger");

    this.type = "DebuggerStatement";
  }
}
