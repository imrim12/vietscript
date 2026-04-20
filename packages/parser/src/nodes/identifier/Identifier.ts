import type { Parser } from '@parser/parser'
import { Keyword } from '@vietscript/shared'

export class Identifier {
  type = 'Identifier'

  name: string

  constructor(parser: Parser) {
    const raw = String(parser.eat(Keyword.IDENTIFIER)?.value)
    let name = raw.replace(/\s+/g, '_')
    if (/^\d/.test(name))
      name = `_${name}`
    this.name = name
  }
}
