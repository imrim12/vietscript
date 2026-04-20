import type { Parser } from '@parser/parser'
import { Expression } from '@parser/nodes/expressions/Expression'
import { Keyword } from '@vietscript/shared'

const UNARY_KEYWORD_OPERATORS: Record<string, string> = {
  [Keyword.DELETE]: 'delete',
  [Keyword.VOID]: 'void',
  [Keyword.TYPEOF]: 'typeof',
}

export class UnaryExpression {
  type = 'UnaryExpression'

  operator: string

  prefix: boolean

  argument: Expression

  constructor(parser: Parser) {
    const type = parser.lookahead?.type as string

    if (UNARY_KEYWORD_OPERATORS[type]) {
      parser.eat(type)
      this.operator = UNARY_KEYWORD_OPERATORS[type]
    }
    else {
      this.operator = String(parser.eat(type).value)
    }

    this.prefix = true
    this.argument = new Expression(parser)
  }
}
