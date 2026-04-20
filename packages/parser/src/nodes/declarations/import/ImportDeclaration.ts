import type { Parser } from '@parser/parser'
import type { ImportDefaultSpecifier } from './ImportDefaultSpecifier'

import type { ImportNamespaceSpecifier } from './ImportNamespaceSpecifier'
import type { ImportSpecifier } from './ImportSpecifier'

import { Keyword } from '@vietscript/shared'
import { Expression } from '../../expressions/Expression'
import { StringLiteral } from '../../literals/StringLiteral'
import { ImportClause } from './ImportClause'

export class ImportDeclaration {
  [key: string]: any;

  type = 'ImportDeclaration'

  specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier> = []

  source!: StringLiteral

  assertions: any[] = []

  importType?: 'value'

  constructor(parser: Parser) {
    parser.eat(Keyword.IMPORT)

    if (parser.lookahead?.type === '(') {
      parser.eat('(')
      const argument = new Expression(parser)
      parser.eat(')')
      Object.assign(this, {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: { type: 'Import' },
          arguments: [argument],
        },
      })
      return
    }

    if (
      parser.lookahead?.type === Keyword.IDENTIFIER
      || parser.lookahead?.type === '*'
      || parser.lookahead?.type === '{'
    ) {
      this.importType = 'value'

      this.specifiers = new ImportClause(parser).specifiers

      parser.eat(Keyword.FROM)
    }

    this.source = new StringLiteral(parser)
  }
}
