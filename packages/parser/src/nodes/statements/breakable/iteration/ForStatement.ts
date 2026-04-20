import type { Parser } from '@parser/parser'
import { VariableDeclaration } from '@parser/nodes/declarations/VariableDeclaration'
import { Expression } from '@parser/nodes/expressions/Expression'
import { Identifier } from '@parser/nodes/identifier/Identifier'
import { ArrayPattern } from '@parser/nodes/patterns/ArrayPattern'
import { ObjectPattern } from '@parser/nodes/patterns/ObjectPattern'
import { BlockStatement } from '@parser/nodes/statements/BlockStatement'
import { Statement } from '@parser/nodes/statements/Statement'
import { Keyword } from '@vietscript/shared'

type ForInit = VariableDeclaration | Identifier | ObjectPattern | ArrayPattern | undefined

export class ForStatement {
  [key: string]: any;

  constructor(parser: Parser) {
    parser.eat(Keyword.FOR)

    let isAwait = false
    if (parser.lookahead?.type === Keyword.AWAIT) {
      parser.eat(Keyword.AWAIT)
      isAwait = true
    }

    parser.eat('(')

    let left: ForInit
    if (parser.lookahead?.type !== ';') {
      switch (parser.lookahead?.type) {
        case Keyword.VAR:
        case Keyword.LET:
        case Keyword.CONST: {
          left = new VariableDeclaration(parser)
          break
        }
        case '{': {
          left = new ObjectPattern(parser)
          break
        }
        case '[': {
          left = new ArrayPattern(parser)
          break
        }
        default: {
          left = new Identifier(parser)
        }
      }
    }

    if (parser.lookahead?.type === Keyword.OF) {
      parser.eat(Keyword.OF)
      const right = new Expression(parser)
      parser.eat(')')
      const body = (parser.lookahead?.type as string) === '{' ? new BlockStatement(parser) : new Statement(parser)

      Object.assign(this, {
        type: 'ForOfStatement',
        left,
        right,
        body,
        await: isAwait,
      })
      return
    }

    if (parser.lookahead?.type === Keyword.IN) {
      parser.eat(Keyword.IN)
      const right = new Expression(parser)
      parser.eat(')')
      const body = (parser.lookahead?.type as string) === '{' ? new BlockStatement(parser) : new Statement(parser)

      Object.assign(this, {
        type: 'ForInStatement',
        left,
        right,
        body,
      })
      return
    }

    parser.eat(';')

    const test = parser.lookahead?.type === ';' ? null : new Expression(parser)

    parser.eat(';')

    const update = (parser.lookahead?.type as string) === ')' ? null : new Expression(parser)

    parser.eat(')')

    const body = parser.lookahead?.type === '{' ? new BlockStatement(parser) : new Statement(parser)

    Object.assign(this, {
      type: 'ForStatement',
      init: left,
      test,
      update,
      body,
    })
  }
}
