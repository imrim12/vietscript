import type { Parser } from '@parser/parser'
import { Expression } from '@parser/nodes/expressions/Expression'
import { Identifier } from '@parser/nodes/identifier/Identifier'
import { Keyword } from '@vietscript/shared'

export class LogicalExpression {
  type = 'LogicalExpression'

  left: any

  operator: string = ''

  right: any

  constructor(parser: Parser, identifier?: any) {
    this.left
      = identifier ?? (parser.lookahead?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser))

    switch (parser.lookahead?.type) {
      case '??':
      case '||':
      case '&&': {
        this.operator = String(parser.eat(parser.lookahead?.type).value)
        break
      }
    }

    this.right = parser.lookahead?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser)
  }
}
