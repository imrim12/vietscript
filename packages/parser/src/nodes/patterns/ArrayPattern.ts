import type { Parser } from '@parser/parser'

import { Expression } from '../expressions/Expression'
import { Identifier } from '../identifier/Identifier'

import { ObjectPattern } from './ObjectPattern'

export interface ArrayPatternAssignment {
  type: 'AssignmentPattern'
  left: Identifier | ObjectPattern | ArrayPattern
  right: Expression
}

export interface ArrayPatternRest {
  type: 'RestElement'
  argument: Identifier | ObjectPattern | ArrayPattern
}

export type ArrayPatternElement = Identifier | ObjectPattern | ArrayPattern | ArrayPatternAssignment | ArrayPatternRest | null

export class ArrayPattern {
  type = 'ArrayPattern'

  elements: Array<ArrayPatternElement> = []

  constructor(parser: Parser) {
    parser.eat('[')

    while (parser.lookahead?.type !== ']') {
      if (parser.lookahead?.type === ',') {
        this.elements.push(null)
        parser.eat(',')
        continue
      }

      if (parser.lookahead?.type === '...') {
        parser.eat('...')
        const argument = parseBindingTarget(parser)
        this.elements.push({ type: 'RestElement', argument })

        if ((parser.lookahead?.type as string) !== ']') {
          throw new SyntaxError(`Rest element phải ở vị trí cuối trong array destructuring`)
        }
        break
      }

      const left = parseBindingTarget(parser)

      if (parser.lookahead?.type === '=') {
        parser.eat('=')
        const right = new Expression(parser)
        this.elements.push({ type: 'AssignmentPattern', left, right })
      }
      else {
        this.elements.push(left)
      }

      if ((parser.lookahead?.type as string) !== ']') {
        parser.eat(',')
      }
    }

    parser.eat(']')
  }
}

function parseBindingTarget(parser: Parser): Identifier | ObjectPattern | ArrayPattern {
  if (parser.lookahead?.type === '{')
    return new ObjectPattern(parser)
  if (parser.lookahead?.type === '[')
    return new ArrayPattern(parser)
  return new Identifier(parser)
}
