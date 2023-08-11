import { Parser } from "@parser/parser";

import { BlockStatement } from "./BlockStatement";
import { BreakStatement } from "./BreakStatement";
import { ContinueStatement } from "./ContinueStatement";
import { ReturnStatement } from "./ReturnStatement";
import { ThrowStatement } from "./ThrowStatement";
import { DebuggerStatement } from "./DebuggerStatement";
import { BreakableStatement } from "./breakable/BreakableStatement";
import { IfStatement } from "./IfStatement";
import { TryStatement } from "./try/TryStatement";
import { WithStatement } from "./WithStatement";
import { ExpressionStatement } from "./ExpressionStatement";

export class Statement {
  [key: string]: any;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case "{": {
        Object.assign(this, new BlockStatement(parser));
        break;
      }
      case "If": {
        Object.assign(this, new IfStatement(parser));
        break;
      }
      case "Do":
      case "While":
      case "For":
      case "Switch": {
        Object.assign(this, new BreakableStatement(parser));
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
      case "With": {
        Object.assign(this, new WithStatement(parser));
        break;
      }
      case "Throw": {
        Object.assign(this, new ThrowStatement(parser));
        break;
      }
      case "Try": {
        Object.assign(this, new TryStatement(parser));
        break;
      }
      case "Debugger": {
        Object.assign(this, new DebuggerStatement(parser));
        break;
      }
      default: {
        Object.assign(this, new ExpressionStatement(parser));
        break;
      }
    }
  }
}
