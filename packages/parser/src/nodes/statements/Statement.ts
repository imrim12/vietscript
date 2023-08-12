import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

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
      case Keyword.IF: {
        Object.assign(this, new IfStatement(parser));
        break;
      }
      case Keyword.DO:
      case Keyword.WHILE:
      case Keyword.FOR:
      case Keyword.SWITCH: {
        Object.assign(this, new BreakableStatement(parser));
        break;
      }
      case Keyword.CONTINUE: {
        Object.assign(this, new ContinueStatement(parser));
        break;
      }
      case Keyword.BREAK: {
        Object.assign(this, new BreakStatement(parser));
        break;
      }
      case Keyword.RETURN: {
        Object.assign(this, new ReturnStatement(parser));
        break;
      }
      case Keyword.WITH: {
        Object.assign(this, new WithStatement(parser));
        break;
      }
      case Keyword.THROW: {
        Object.assign(this, new ThrowStatement(parser));
        break;
      }
      case Keyword.TRY: {
        Object.assign(this, new TryStatement(parser));
        break;
      }
      case Keyword.DEBUGGER: {
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
