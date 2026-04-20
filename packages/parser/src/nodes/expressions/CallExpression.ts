import type { Parser } from '@parser/parser'
import { Expression } from '@parser/nodes/expressions/Expression'

import { SpreadElement } from './SpreadElement'

export class CallExpression {
  type = 'CallExpression'

  callee: any

  arguments: Array<any> = []

  optional = false

  constructor(parser: Parser, identifier: any) {
    this.callee = identifier

    parser.eat('(')

    while (parser.lookahead?.type !== ')') {
      if (this.arguments.length > 0) {
        parser.eat(',')
      }

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
