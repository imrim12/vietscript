import type { Token } from '@vietscript/shared'
import { Parser } from '@parser/parser'
import { Tokenizer } from '@parser/tokenizer'

import { fixtures } from '../__bench__/fixtures'

function tokenizeAll(source: string): Token[] {
  const parser = new Parser()
  parser.syntax = source
  parser.tokenizer = new Tokenizer(parser)
  const tokens: Token[] = []
  let tok = parser.tokenizer.getNextToken()
  while (tok !== null) {
    tokens.push(tok)
    tok = parser.tokenizer.getNextToken()
  }
  return tokens
}

describe('bench fixtures must tokenize without errors', () => {
  for (const [name, source] of Object.entries(fixtures)) {
    it(`fixture: ${name}`, () => {
      expect(() => tokenizeAll(source)).not.toThrow()
      const tokens = tokenizeAll(source)
      expect(tokens.length).toBeGreaterThan(0)
    }, 60_000)
  }
})
