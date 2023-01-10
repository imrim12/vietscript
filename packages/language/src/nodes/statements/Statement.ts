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
  type: string;

  [key: string]: any;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case "{": {
        Object.assign(this, new BlockStatement(parser));
        break;
      }
      case "Var":
      case "Let":
      case "Const": {
        Object.assign(this, new VariableDeclaration(parser));
        break;
      }
      case "Async":
      case "Function": {
        Object.assign(this, new FunctionDeclaration(parser));
        break;
      }
      case "Continue": {
        Object.assign(this, new ContinueStatement(parser));
        break;
      }
      case "Break": {
        Object.assign(this, new BreakStatement(parser));
        break;
      }
      case "Return": {
        Object.assign(this, new ReturnStatement(parser));
        break;
      }
      case "Throw": {
        Object.assign(this, new ThrowStatement(parser));
        break;
      }
      case "Debugger": {
        Object.assign(this, new DebuggerStatement(parser));
        break;
      }
    }
  }
}
