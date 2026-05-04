import type { Parser } from '@parser/parser'
import { Expression } from '@parser/nodes/expressions/Expression'

export class LogicalExpression {
  type = 'LogicalExpression'

  left: any

  operator: string = ''

  right: any

  constructor(parser: Parser, identifier?: any) {
    this.left = identifier ?? new Expression(parser)

    switch (parser.lookahead?.type) {
      case '??':
      case '||':
      case '&&': {
        this.operator = String(parser.eat(parser.lookahead?.type).value)
        break
      }
    }

    this.right = new Expression(parser)
  }
}
