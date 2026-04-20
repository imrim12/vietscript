import type { Parser } from '@parser/parser'
import { Keyword } from '@vietscript/shared'

export class ThisExpression {
  type = 'ThisExpression'

  constructor(parser: Parser) {
    parser.eat(Keyword.THIS)
  }
}
