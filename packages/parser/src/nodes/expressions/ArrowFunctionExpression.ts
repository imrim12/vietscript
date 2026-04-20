import type { Parameter } from '@parser/nodes/declarations/ParameterList'
import type { Parser } from '@parser/parser'
import { BlockStatement } from '@parser/nodes/statements/BlockStatement'

import { Expression } from './Expression'

export class ArrowFunctionExpression {
  type = 'ArrowFunctionExpression'

  id: null = null

  expression = true

  generator = false

  async = false

  params: Array<Parameter> = []

  body: Expression | BlockStatement

  constructor(parser: Parser, params: Array<Parameter>, isAsync = false) {
    parser.eat('=>')

    this.params = params
    this.async = isAsync

    if (parser.lookahead?.type === '{') {
      this.body = new BlockStatement(parser)
      this.expression = false
    }
    else {
      this.body = new Expression(parser)
      this.expression = true
    }
  }
}
