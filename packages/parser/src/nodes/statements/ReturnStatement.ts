import type { Parser } from '@parser/parser'
import { Keyword } from '@vietscript/shared'

import { Expression } from '../expressions/Expression'

const TERMINATORS = new Set<string>(['}', ';', ')'])

export class ReturnStatement {
  type = 'ReturnStatement'

  argument: Expression | null = null

  constructor(parser: Parser) {
    parser.eat(Keyword.RETURN)

    const next = parser.lookahead?.type as string | undefined
    if (next === undefined || TERMINATORS.has(next)) {
      return
    }

    this.argument = new Expression(parser)
  }
}
