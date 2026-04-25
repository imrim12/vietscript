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

describe('bench fixtures token-stream snapshots', () => {
  for (const [name, source] of Object.entries(fixtures)) {
    it(`stable snapshot: ${name}`, () => {
      const tokens = tokenizeAll(source)
      const summary = tokens.map(t => `${t.type}|${t.value}|${t.start}-${t.end}`)
      expect(summary).toMatchSnapshot()
    }, 60_000)
  }
})
