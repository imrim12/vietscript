import type { Parser } from '@parser/parser'
import { Keyword } from '@vietscript/shared'

import { Declaration } from '../declarations/Declaration'

import { Statement } from './Statement'

export class StatementListItem {
  [key: string]: any;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case Keyword.VAR:
      case Keyword.LET:
      case Keyword.CONST:
      case Keyword.ASYNC:
      case Keyword.FUNCTION:
      case Keyword.CLASS:
      case Keyword.IMPORT:
      case Keyword.EXPORT: {
        Object.assign(this, new Declaration(parser))
        break
      }
      case '{':
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
      case Keyword.DEBUGGER:
      case Keyword.YIELD:
      case Keyword.AWAIT:
      case Keyword.THIS:
      case Keyword.NUMBER:
      case Keyword.STRING:
      case Keyword.BOOLEAN:
      case Keyword.NULL:
      case Keyword.NAN:
      case Keyword.INFINITY:
      case Keyword.UNDEFINED:
      case Keyword.SUPER:
      case Keyword.NEW: {
        Object.assign(this, new Statement(parser))
        break
      }
    }
  }
}
