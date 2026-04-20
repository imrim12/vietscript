import type { Parser } from '@parser/parser'
import { Keyword } from '@vietscript/shared'

import { Identifier } from '../identifier/Identifier'

export class ContinueStatement {
  type = 'ContinueStatement'

  label: Identifier | null = null

  constructor(parser: Parser) {
    parser.eat(Keyword.CONTINUE)

    if (parser.lookahead?.type === Keyword.IDENTIFIER) {
      this.label = new Identifier(parser)
    }
  }
}
