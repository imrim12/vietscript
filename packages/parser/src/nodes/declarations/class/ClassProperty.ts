import type { Parser } from '@parser/parser'
import { Expression } from '@parser/nodes/expressions/Expression'
import { FunctionExpression } from '@parser/nodes/expressions/FunctionExpression'
import { Identifier } from '@parser/nodes/identifier/Identifier'
import { PrivateName } from '@parser/nodes/identifier/PrivateName'
import { Keyword } from '@vietscript/shared'

import { ClassMethod } from './ClassMethod'

const ACCESS_MODIFIERS: Record<string, string> = {
  [Keyword.PUBLIC]: 'public',
  [Keyword.PRIVATE]: 'private',
  [Keyword.PROTECTED]: 'protected',
}

export class ClassProperty {
  [key: string]: any;

  type = 'ClassProperty'

  static = false

  computed = false

  accessibility?: string

  key: Identifier | Expression | PrivateName

  value: null | Expression

  constructor(parser: Parser) {
    const type = parser.lookahead?.type as string
    if (ACCESS_MODIFIERS[type]) {
      parser.eat(type)
      this.accessibility = ACCESS_MODIFIERS[type]
    }

    if (parser.lookahead?.type === Keyword.STATIC) {
      parser.eat(Keyword.STATIC)
      this.static = true
    }

    switch (parser.lookahead?.type) {
      case Keyword.GET:
      case Keyword.SET:
      case Keyword.ASYNC: {
        Object.assign(this, new ClassMethod(parser, this.static))
        break
      }
      case '*': {
        parser.eat('*')
        Object.assign(this, new ClassMethod(parser, this.static));
        (this as any).generator = true
        break
      }
      default: {
        if (parser.lookahead?.type === '[') {
          parser.eat('[')
          this.key = new Expression(parser)
          this.computed = true
          parser.eat(']')
        }
        else if (parser.lookahead?.type === '#') {
          this.key = new PrivateName(parser)
          this.type = 'ClassPrivateProperty'
        }
        else if (parser.lookahead?.type === Keyword.CONSTRUCTOR) {
          const tok = parser.eat(Keyword.CONSTRUCTOR)
          this.key = { type: 'Identifier', name: 'constructor', start: tok.start, end: tok.end } as unknown as Identifier
        }
        else {
          this.key = new Identifier(parser)
        }

        if (parser.lookahead?.type === '(') {
          const method = new FunctionExpression(parser, true)
          this.type = this.type === 'ClassPrivateProperty' ? 'ClassPrivateMethod' : 'ClassMethod';
          (this as any).kind = 'method';
          (this as any).generator = method.generator;
          (this as any).async = method.async;
          (this as any).params = method.params;
          (this as any).body = method.body;
          (this as any).id = null
        }
        else if (parser.lookahead?.type === '=') {
          parser.eat('=')
          this.value = new Expression(parser)
        }
        else {
          this.value = null
        }
      }
    }
  }
}
