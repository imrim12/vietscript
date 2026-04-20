import type { Parser } from '@parser'

import { Identifier } from '../identifier/Identifier'
import { PrivateName } from '../identifier/PrivateName'

import { Expression } from './Expression'

export class MemberExpression {
  type = 'MemberExpression'

  object: any

  property: any = null

  computed = false

  optional = false

  constructor(parser: Parser, object: any) {
    this.object = object

    do {
      switch (parser.lookahead?.type) {
        case '[': {
          parser.eat('[')
          this.object = this.property ? { ...this } : { ...this.object }
          this.property = new Expression(parser)
          parser.eat(']')
          this.computed = true
          this.optional = false
          break
        }
        case '.': {
          parser.eat('.')
          this.object = this.property ? { ...this } : { ...this.object }
          if ((parser.lookahead?.type as string) === '#') {
            this.property = new PrivateName(parser) as any
          }
          else {
            this.property = new Identifier(parser)
          }
          this.computed = false
          this.optional = false
          break
        }
        case '?.': {
          parser.eat('?.')
          this.object = this.property ? { ...this } : { ...this.object }
          this.type = 'OptionalMemberExpression'
          this.optional = true

          if ((parser.lookahead?.type as string) === '[') {
            parser.eat('[')
            this.property = new Expression(parser)
            parser.eat(']')
            this.computed = true
          }
          else {
            this.property = new Identifier(parser)
            this.computed = false
          }
          break
        }
      }
    } while (
      parser.lookahead?.type === '.'
      || parser.lookahead?.type === '['
      || parser.lookahead?.type === '?.'
    )
  }
}
