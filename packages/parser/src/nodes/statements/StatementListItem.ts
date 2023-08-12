import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

import { Declaration } from "../declarations/Declaration";

import { Statement } from "./Statement";

export class StatementListItem {
  [key: string]: any;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case Keyword.VAR:
      case Keyword.LET:
      case Keyword.CONST:
      case Keyword.ASYNC:
      case Keyword.FUNCTION:
      case Keyword.CLASS: {
        Object.assign(this, new Declaration(parser));
        break;
      }
      case Keyword.IF:
      case Keyword.DO:
      case Keyword.WHILE:
      case Keyword.FOR:
      case Keyword.SWITCH:
      case Keyword.CONTINUE:
      case Keyword.BREAK:
      case Keyword.RETURN:
      case Keyword.WITH:
      case Keyword.IDENTIFIER:
      case Keyword.THROW:
      case Keyword.TRY:
      case Keyword.DEBUGGER: {
        Object.assign(this, new Statement(parser));
        break;
      }
    }
  }
}
