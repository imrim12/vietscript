import type { Parser } from '@parser/parser'
import { StringLiteral } from '@parser/nodes/literals/StringLiteral'
import { Keyword } from '@vietscript/shared'

export class ExportAllDeclaration {
  type = 'ExportAllDeclaration'

  source: StringLiteral

  constructor(parser: Parser) {
    parser.eat('*')

    parser.eat(Keyword.FROM)

    this.source = new StringLiteral(parser)
  }
}
