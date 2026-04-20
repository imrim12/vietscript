import type { Parser } from '@parser/parser'
import { Expression } from '@parser/nodes/expressions/Expression'
import { Identifier } from '@parser/nodes/identifier/Identifier'
import { Keyword } from '@vietscript/shared'

const ASSIGNMENT_OPERATORS = new Set([
  '=',
  '+=',
  '-=',
  '*=',
  '/=',
  '%=',
  '**=',
  '&=',
  '|=',
  '^=',
  '<<=',
  '>>=',
  '>>>=',
  '&&=',
  '||=',
  '??=',
])

export class AssignmentExpression {
  type = 'AssignmentExpression'

  left: any

  operator: string = ''

  right: any

  constructor(parser: Parser, identifier?: any) {
    this.left
      = identifier ?? (parser.lookahead?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser))

    const op = String(parser.lookahead?.type)
    if (!ASSIGNMENT_OPERATORS.has(op)) {
      throw new SyntaxError(`Expected assignment operator, got: "${op}"`)
    }

    this.operator = String(parser.eat(op).value)

    this.right = parser.lookahead?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser)
  }
}
