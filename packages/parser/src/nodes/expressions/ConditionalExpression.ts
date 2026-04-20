import type { Parser } from '@parser/parser'

import { Expression } from './Expression'

export class ConditionalExpression {
  type = 'ConditionalExpression'

  test: any

  consequent: any

  alternate: any

  constructor(parser: Parser, test: any) {
    this.test = test
    parser.eat('?')
    parser.ternaryDepth++
    try {
      this.consequent = new Expression(parser)
    }
    finally {
      parser.ternaryDepth--
    }
    parser.eat(':')
    this.alternate = new Expression(parser)
  }
}
