import type { BlockStatement } from '@parser/nodes/statements/BlockStatement'
import type { Parser } from '@parser/parser'
import { Expression } from '@parser/nodes/expressions/Expression'
import { FunctionExpression } from '@parser/nodes/expressions/FunctionExpression'
import { Identifier } from '@parser/nodes/identifier/Identifier'
import { PrivateName } from '@parser/nodes/identifier/PrivateName'
import { Keyword } from '@vietscript/shared'

export class ClassMethod {
  type = 'ClassMethod'

  static = false

  key: Identifier | Expression | PrivateName

  computed = false

  kind: 'method' | 'get' | 'set' = 'method'

  id = null

  generator = false

  async = false

  params: any[] = []

  body: BlockStatement

  constructor(parser: Parser, isStatic = false) {
    this.static = isStatic
    switch (parser.lookahead?.type) {
      case Keyword.GET: {
        parser.eat(Keyword.GET)
        this.kind = 'get'
        break
      }
      case Keyword.SET: {
        parser.eat(Keyword.SET)
        this.kind = 'set'
        break
      }
      case Keyword.ASYNC: {
        parser.eat(Keyword.ASYNC)
        this.async = true
        break
      }
    }

    if (parser.lookahead?.type === '[') {
      parser.eat('[')
      this.key = new Expression(parser)
      this.computed = true
      parser.eat(']')
    }
    else if (parser.lookahead?.type === '#') {
      this.key = new PrivateName(parser)
      this.type = 'ClassPrivateMethod' as any
    }
    else {
      this.key = new Identifier(parser)
    }

    const _method = new FunctionExpression(parser, true)

    this.id = _method.id
    this.generator = _method.generator
    this.params = _method.params
    this.body = _method.body
  }
}
