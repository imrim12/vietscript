import type { Parser } from '@parser/parser'

import type { StatementListItem } from './StatementListItem'
import { StatementList } from './StatementList'

export class BlockStatement {
  type = 'BlockStatement'

  body: Array<StatementListItem>

  directives: Array<any> = []

  constructor(parser: Parser) {
    const statements: Array<StatementListItem> = []

    parser.eat('{')

    // List of statement
    statements.push(...new StatementList(parser, ['}']).body)

    parser.eat('}')

    this.body = statements
  }
}
