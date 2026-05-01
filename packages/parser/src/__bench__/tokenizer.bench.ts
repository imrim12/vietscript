import type { Token } from '@vietscript/shared'
import { Parser } from '@parser/parser'
import { Tokenizer } from '@parser/tokenizer'
import { bench, describe } from 'vitest'

import { fixtures } from './fixtures'

function tokenizeAll(source: string): number {
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

const NAMES = ['tiny', 'medium', 'keywordHeavy', 'stringHeavy', 'large'] as const

describe('tokenizer', () => {
  for (const name of NAMES) {
    const source = fixtures[name]
    bench(`tokenize ${name} (${source.length} chars)`, () => {
      tokenizeAll(source)
    })
  }
})
