import type { Parser } from '@parser/parser'
import type { Node } from '@vietscript/shared'
import { Keyword } from '@vietscript/shared'

export class UndefinedIdentifier implements Node {
  type = Keyword.IDENTIFIER

  name = 'undefined'

  start: number

  end: number

  constructor(parser: Parser) {
    const token = parser.eat(Keyword.UNDEFINED)

    this.start = token.start
    this.end = token.end
  }
}
