import type { Token } from '@vietscript/shared'
import { Parser } from '@parser/parser'

import { Tokenizer } from '@parser/tokenizer'
import { Keyword } from '@vietscript/shared'

function tokenize(source: string) {
  const parser = new Parser()
  parser.syntax = source
  parser.tokenizer = new Tokenizer(parser)
  parser.lookahead = null

  const tokens: Token[] = []
  let next = parser.tokenizer.getNextToken()
  while (next !== null) {
    tokens.push(next)
    next = parser.tokenizer.getNextToken()
  }
  return tokens
}

describe('vietnamese-keywords.test', () => {
  const cases: Array<[string, string, Keyword]> = [
    ['biến', 'let', Keyword.LET],
    ['biến', 'biến', Keyword.LET],
    ['yield', 'yield', Keyword.YIELD],
    ['yield', 'nhường', Keyword.YIELD],
    ['this', 'this', Keyword.THIS],
    ['this', 'đây', Keyword.THIS],
    ['null', 'null', Keyword.NULL],
    ['null', 'rỗng', Keyword.NULL],
    ['instanceof', 'instanceof', Keyword.INSTANCEOF],
    ['instanceof', 'là kiểu', Keyword.INSTANCEOF],
    ['static', 'static', Keyword.STATIC],
    ['static', 'tĩnh', Keyword.STATIC],
    ['public', 'public', Keyword.PUBLIC],
    ['public', 'công khai', Keyword.PUBLIC],
    ['private', 'private', Keyword.PRIVATE],
    ['private', 'riêng tư', Keyword.PRIVATE],
    ['protected', 'protected', Keyword.PROTECTED],
    ['protected', 'bảo vệ', Keyword.PROTECTED],
    ['get', 'get', Keyword.GET],
    ['get', 'lấy', Keyword.GET],
    ['set', 'set', Keyword.SET],
    ['set', 'gán', Keyword.SET],
    ['of', 'of', Keyword.OF],
    ['of', 'của', Keyword.OF],
    ['Infinity', 'Infinity', Keyword.INFINITY],
    ['Infinity', 'vô cực', Keyword.INFINITY],
    ['for', 'for', Keyword.FOR],
    ['for', 'lặp', Keyword.FOR],
  ]

  for (const [label, source, expected] of cases) {
    it(`should tokenize "${source}" as ${label} keyword`, () => {
      const tokens = tokenize(source)
      expect(tokens).toHaveLength(1)
      expect(tokens[0].type).toBe(expected)
      expect(tokens[0].value).toBe(source)
    })
  }

  it('should keep english keywords working after adding vietnamese aliases', () => {
    const tokens = tokenize('let x')
    expect(tokens.map(t => t.type)).toEqual([Keyword.LET, Keyword.IDENTIFIER])
  })

  it('should not consume trailing letters after vietnamese keyword ending in non-ASCII', () => {
    const tokens = tokenize('riêng tư x')
    expect(tokens).toHaveLength(2)
    expect(tokens[0].type).toBe(Keyword.PRIVATE)
    expect(tokens[1].type).toBe(Keyword.IDENTIFIER)
    expect(tokens[1].value).toBe('x')
  })

  it('should tokenize bảo vệ followed by identifier', () => {
    const tokens = tokenize('bảo vệ phương thức')
    expect(tokens).toHaveLength(2)
    expect(tokens[0].type).toBe(Keyword.PROTECTED)
    expect(tokens[1].type).toBe(Keyword.IDENTIFIER)
  })
})
