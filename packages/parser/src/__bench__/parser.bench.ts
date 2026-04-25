import { Parser } from '@parser/parser'
import { bench, describe } from 'vitest'

import { fixtures } from './fixtures'

// Note: parser bench uses only fixtures that successfully build a full AST.
// The other fixtures still exercise the tokenizer (see tokenizer.bench.ts).
const PARSE_OK = ['tiny'] as const

describe('parser end-to-end (regex baseline)', () => {
  for (const name of PARSE_OK) {
    const source = fixtures[name]
    bench(`parse ${name} (${source.length} chars)`, () => {
      const parser = new Parser()
      parser.parse(source)
    })
  }
})
