import type { Parser } from '@parser/parser'
import type { ImportSpecifier } from './ImportSpecifier'

import { Keyword } from '@vietscript/shared'
import { ImportDefaultSpecifier } from './ImportDefaultSpecifier'
import { ImportNamespaceSpecifier } from './ImportNamespaceSpecifier'
import { ImportsList } from './ImportsList'

export class ImportClause {
  specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier> = []

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case '*': {
        this.specifiers = [new ImportNamespaceSpecifier(parser)]
        break
      }
      case '{': {
        parser.eat('{')
        this.specifiers = new ImportsList(parser).specifiers
        parser.eat('}')

        if ((parser.lookahead?.type as string) === ',') {
          parser.eat(',')
          parser.eat('{')
          this.specifiers.push(new ImportDefaultSpecifier(parser))
          parser.eat('}')
        }
        break
      }
      case Keyword.IDENTIFIER: {
        this.specifiers = [new ImportDefaultSpecifier(parser)]

        if ((parser.lookahead?.type as string) === ',') {
          parser.eat(',')
          parser.eat('{')
          this.specifiers.push(...new ImportsList(parser).specifiers)
          parser.eat('}')
        }
        break
      }
    }
  }
}
