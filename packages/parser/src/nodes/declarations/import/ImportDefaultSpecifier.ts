import type { Parser } from '@parser/parser'
import { Identifier } from '@parser/nodes/identifier/Identifier'

export class ImportDefaultSpecifier {
  type = 'ImportDefaultSpecifier'

  local: Identifier

  constructor(parser: Parser) {
    if (typeof parser.lookahead?.value === 'string') {
      const fromToken = /\s+từ$/.exec(parser.lookahead.value)?.[0]

      if (fromToken) {
        parser.tokenizer.rollback(fromToken.length)

        parser.lookahead.value = parser.lookahead.value.replace(/\s+từ$/g, '')
      }
    }

    this.local = new Identifier(parser)
  }
}
