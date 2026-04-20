import type { Parser } from '@parser/parser'

import { Expression } from '../expressions/Expression'

const STATEMENT_TYPES = new Set(['LabeledStatement'])

export class ExpressionStatement {
  [key: string]: any;

  constructor(parser: Parser) {
    const expr = new Expression(parser)
    if (STATEMENT_TYPES.has((expr as any).type)) {
      Object.assign(this, expr)
      return
    }
    this.type = 'ExpressionStatement'
    this.expression = expr
  }
}
