import type { Token } from '@vietscript/shared'
import { Parser } from '@parser/parser'
import { Tokenizer } from '@parser/tokenizer'
import { TokenizerFSM } from '@parser/tokenizer-fsm'
import { bench, describe } from 'vitest'

import { fixtures } from './fixtures'

function tokenizeRegex(source: string): number {
  const parser = new Parser()
  parser.syntax = source
  parser.tokenizer = new Tokenizer(parser)
  let count = 0
  let tok: Token | null = parser.tokenizer.getNextToken()
  while (tok !== null) {
    count++
    tok = parser.tokenizer.getNextToken()
  }
  return count
}

function tokenizeFSM(source: string): number {
  const parser = new Parser()
  parser.syntax = source
  parser.tokenizer = new TokenizerFSM(parser)
  let count = 0
  let tok: Token | null = parser.tokenizer.getNextToken()
  while (tok !== null) {
    count++
    tok = parser.tokenizer.getNextToken()
  }
  return count
}

const NAMES = ['tiny', 'medium', 'keywordHeavy', 'stringHeavy', 'large'] as const

for (const name of NAMES) {
  const source = fixtures[name]
  describe(`tokenize ${name} (${source.length} chars)`, () => {
    bench('regex', () => {
      tokenizeRegex(source)
    })
    bench('fsm', () => {
      tokenizeFSM(source)
    })
  })
}
