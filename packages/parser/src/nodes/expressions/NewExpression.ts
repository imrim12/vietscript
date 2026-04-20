import type { Parser } from '@parser/parser'
import { Identifier } from '@parser/nodes/identifier/Identifier'
import { Keyword } from '@vietscript/shared'

import { Expression } from './Expression'
import { SpreadElement } from './SpreadElement'

export class NewExpression {
  type = 'NewExpression'

  callee: Identifier | Expression

  arguments: Array<Identifier | Expression | SpreadElement> = []

  constructor(parser: Parser) {
    parser.eat(Keyword.NEW)

    this.callee = new Identifier(parser)

    if (parser.lookahead?.type === '(') {
      parser.eat('(')
      while (parser.lookahead?.type !== ')') {
        if (this.arguments.length > 0)
          parser.eat(',')
        if (parser.lookahead?.type === '...') {
          this.arguments.push(new SpreadElement(parser))
        }
        else {
          this.arguments.push(new Expression(parser))
        }
      }
      parser.eat(')')
    }
  }
}
