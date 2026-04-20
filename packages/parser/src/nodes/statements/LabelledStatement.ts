import type { Parser } from '@parser/parser'

import type { Identifier } from '../identifier/Identifier'

import { BlockStatement } from './BlockStatement'
import { Statement } from './Statement'

export class LabelledStatement {
  type = 'LabeledStatement'

  label: Identifier

  body: Statement | BlockStatement

  constructor(parser: Parser, identifier: Identifier) {
    this.label = identifier

    parser.eat(':')

    this.body = parser.lookahead?.type === '{' ? new BlockStatement(parser) : new Statement(parser)
  }
}
