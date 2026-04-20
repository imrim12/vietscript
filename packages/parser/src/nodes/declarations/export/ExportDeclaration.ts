import type { Parser } from '@parser/parser'
import { Keyword } from '@vietscript/shared'

import { ExportAllDeclaration } from './ExportAllDeclaration'
import { ExportDefaultDeclaration } from './ExportDefaultDeclaration'
import { ExportNamedDeclaration } from './ExportNamedDeclaration'

export class ExportDeclaration {
  constructor(parser: Parser) {
    if (parser.lookahead?.type === Keyword.EXPORT) {
      parser.eat(Keyword.EXPORT)
    }

    switch (parser.lookahead?.type) {
      case '*': {
        Object.assign(this, new ExportAllDeclaration(parser))
        break
      }
      case '{': {
        Object.assign(this, new ExportNamedDeclaration(parser))
        break
      }
      case Keyword.DEFAULT: {
        Object.assign(this, new ExportDefaultDeclaration(parser))
        break
      }
    }
  }
}
