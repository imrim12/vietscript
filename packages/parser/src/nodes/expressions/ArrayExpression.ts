import type { Parser } from '@parser/parser'

import type { Expression } from './Expression'

import { ArrayLiteral } from '../literals/ArrayLiteral'

export class ArrayExpression {
  type = 'ArrayExpression'

  elements: Array<Expression>

  constructor(parser: Parser) {
    this.elements = new ArrayLiteral(parser).elements
  }
}
