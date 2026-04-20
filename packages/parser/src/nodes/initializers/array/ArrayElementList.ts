import type { Parser } from '@parser/parser'

import { Expression } from '../../expressions/Expression'
import { SpreadElement } from '../../expressions/SpreadElement'

export class ArrayElementList {
  type = 'ArrayElementList'

  elements: Array<Expression | SpreadElement> = []

  constructor(parser: Parser, stopToken = ']') {
    while (parser.lookahead?.type !== stopToken) {
      if (parser.lookahead?.type === '...') {
        this.elements.push(new SpreadElement(parser))
      }
      else {
        this.elements.push(new Expression(parser))
      }

      if (parser.lookahead?.type !== stopToken) {
        parser.eat(',')
      }
    }
  }
}
