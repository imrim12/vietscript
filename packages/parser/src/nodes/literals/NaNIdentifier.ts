import type { Parser } from '@parser/parser'
import type { Node } from '@vietscript/shared'
import { Keyword } from '@vietscript/shared'

export class NaNIdentifier implements Node {
  type = Keyword.IDENTIFIER

  name = Keyword.NAN

  start: number

  end: number

  constructor(parser: Parser) {
    const token = parser.eat(Keyword.NAN)

    this.start = token.start
    this.end = token.end
  }
}
