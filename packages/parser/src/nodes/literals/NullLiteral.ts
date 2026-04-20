import type { Parser } from '@parser/parser'
import type { Node } from '@vietscript/shared'
import { Keyword } from '@vietscript/shared'

export class NullLiteral implements Node {
  type = 'NullLiteral'

  start: number

  end: number

  constructor(parser: Parser) {
    const token = parser.eat(Keyword.NULL)

    this.start = token.start
    this.end = token.end
  }
}
