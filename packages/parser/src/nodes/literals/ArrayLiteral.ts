import type { Parser } from '@parser/parser'

import { ArrayElementList } from '../initializers/array/ArrayElementList'

export class ArrayLiteral {
  type = 'ArrayLiteral'

  elements: Array<any>

  constructor(parser: Parser) {
    parser.eat('[')

    this.elements = new ArrayElementList(parser, ']').elements

    parser.eat(']')
  }
}
