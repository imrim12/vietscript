import { Parser } from "@lang/parser";

import { VariableDeclaration } from "../declarations/VariableDeclaration";
import { FunctionDeclaration } from "../declarations/FunctionDeclaration";

import { BlockStatement } from "./BlockStatement";
import { BreakStatement } from "./BreakStatement";
import { ContinueStatement } from "./ContinueStatement";
import { ReturnStatement } from "./ReturnStatement";
import { ThrowStatement } from "./ThrowStatement";
import { DebuggerStatement } from "./DebuggerStatement";

export class Statement {
  node: {
    type: string;
    [key: string]: any;
  };

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case "{": {
        this.node = new BlockStatement(parser).node;
        break;
      }
      case "Var":
      case "Let":
      case "Const": {
        this.node = new VariableDeclaration(parser).node;
        break;
      }
      case "Async":
      case "Function": {
        this.node = new FunctionDeclaration(parser).node;
        break;
      }
      case "Continue": {
        this.node = new ContinueStatement(parser).node;
        break;
      }
      case "Break": {
        this.node = new BreakStatement(parser).node;
        break;
      }
      case "Return": {
        this.node = new ReturnStatement(parser).node;
        break;
      }
      case "Throw": {
        this.node = new ThrowStatement(parser).node;
        break;
      }
      case "Debugger": {
        this.node = new DebuggerStatement(parser).node;
        break;
      }
    }
  }
}
