import type { Identifier } from '@parser/nodes/identifier/Identifier'
import type { Parser } from '@parser/parser'
import { Expression } from '@parser/nodes/expressions/Expression'
import { Keyword } from '@vietscript/shared'

const KEYWORD_OPERATORS: Record<string, string> = {
  [Keyword.INSTANCEOF]: 'instanceof',
  [Keyword.IN]: 'in',
}

const BINARY_OPERATORS = new Set([
  '+',
  '-',
  '*',
  '/',
  '%',
  '**',
  '&',
  '|',
  '^',
  '>',
  '>>',
  '>>>',
  '<',
  '<<',
  '>=',
  '<=',
  '==',
  '===',
  '!=',
  '!==',
])

export class BinaryExpression {
  type = 'BinaryExpression'

  left: Identifier | Expression

  operator!: string

  right: Identifier | Expression

  constructor(parser: Parser, identifier?: Identifier) {
    this.left = identifier ?? new Expression(parser)

    const type = parser.lookahead?.type as string

    if (KEYWORD_OPERATORS[type]) {
      parser.eat(type)
      this.operator = KEYWORD_OPERATORS[type]
    }
    else if (BINARY_OPERATORS.has(type)) {
      this.operator = String(parser.eat(type).value)
    }

    this.right = new Expression(parser)
  }
}
