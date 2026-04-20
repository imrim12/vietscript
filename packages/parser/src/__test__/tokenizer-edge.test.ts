import type { Token } from '@vietscript/shared'
import { Parser } from '@parser/parser'

import { Tokenizer } from '@parser/tokenizer'
import { Keyword } from '@vietscript/shared'

function tokenize(source: string) {
  const parser = new Parser()
  parser.syntax = source
  parser.tokenizer = new Tokenizer(parser)
  const tokens: Token[] = []
  let next = parser.tokenizer.getNextToken()
  while (next !== null) {
    tokens.push(next)
    next = parser.tokenizer.getNextToken()
  }
  return tokens
}

describe('tokenizer-edge.test', () => {
  it('should skip whitespace and comments', () => {
    const tokens = tokenize('  \n  // comment\n  /* block */\n42')
    expect(tokens).toHaveLength(1)
    expect(tokens[0].type).toBe(Keyword.NUMBER)
  })

  it('should handle empty source', () => {
    const tokens = tokenize('')
    expect(tokens).toHaveLength(0)
  })

  it('should throw on unknown token', () => {
    expect(() => tokenize('@@@')).toThrow()
  })

  it('should tokenize complex operator sequence', () => {
    const tokens = tokenize('a >>>= b')
    expect(tokens.map(t => t.type)).toEqual([Keyword.IDENTIFIER, '>>>=', Keyword.IDENTIFIER])
  })

  it('should tokenize template with embedded interpolation', () => {
    const tokens = tokenize('`a${b}c`')
    expect(tokens).toHaveLength(1)
    expect(tokens[0].type).toBe('TemplateLiteral')
  })

  it('should distinguish regex from division by context', () => {
    const afterOp = tokenize('x = /abc/g')
    expect(afterOp[2].type).toBe('RegExpLiteral')

    const afterIdent = tokenize('x / y')
    expect(afterIdent[1].type).toBe('/')
  })

  it('should tokenize nested destructuring-safe content', () => {
    const tokens = tokenize('{ a: { b } }')
    expect(tokens.length).toBeGreaterThan(5)
  })

  it('should handle unicode escape in string', () => {
    const tokens = tokenize('"\\u00E1"')
    expect(tokens).toHaveLength(1)
    expect(tokens[0].type).toBe(Keyword.STRING)
  })
})
