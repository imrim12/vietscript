import { Parser } from "@lang/parser";

export class DebuggerStatement {
  node: {
    type: "DebuggerStatement";
  };

  constructor(parser: Parser) {
    parser.eat("Debugger");

    this.node = {
      type: "DebuggerStatement",
    };
  }
}
