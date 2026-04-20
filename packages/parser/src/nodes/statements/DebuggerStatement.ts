import type { Parser } from '@parser/parser'
import { Keyword } from '@vietscript/shared'

export class DebuggerStatement {
  type = 'DebuggerStatement'

  constructor(parser: Parser) {
    parser.eat(Keyword.DEBUGGER)
  }
}
