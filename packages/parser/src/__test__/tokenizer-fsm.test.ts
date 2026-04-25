import type { Token } from '@vietscript/shared'
import { Parser } from '@parser/parser'

import { Tokenizer } from '@parser/tokenizer'
import { TokenizerFSM } from '@parser/tokenizer-fsm'
import { Keyword } from '@vietscript/shared'

import { fixtures } from '../__bench__/fixtures'

function tokenizeRegex(source: string): Token[] {
  const parser = new Parser()
  parser.syntax = source
  parser.tokenizer = new Tokenizer(parser)
  const out: Token[] = []
  let t = parser.tokenizer.getNextToken()
  while (t !== null) {
    out.push(t)
    t = parser.tokenizer.getNextToken()
  }
  return out
}

function tokenizeFSM(source: string): Token[] {
  const parser = new Parser()
  parser.syntax = source
  parser.tokenizer = new TokenizerFSM(parser)
  const out: Token[] = []
  let t = parser.tokenizer.getNextToken()
  while (t !== null) {
    out.push(t)
    t = parser.tokenizer.getNextToken()
  }
  return out
}

describe('tokenizer-fsm: parity with regex tokenizer', () => {
  it('empty input', () => {
    expect(tokenizeFSM('')).toEqual(tokenizeRegex(''))
  })

  it('whitespace only', () => {
    expect(tokenizeFSM('   \n\t')).toEqual(tokenizeRegex('   \n\t'))
  })

  it('line comment', () => {
    expect(tokenizeFSM('// hello\n42')).toEqual(tokenizeRegex('// hello\n42'))
  })

  it('block comment', () => {
    expect(tokenizeFSM('/* a\nb */ x')).toEqual(tokenizeRegex('/* a\nb */ x'))
  })

  it('integer literal', () => {
    expect(tokenizeFSM('42')).toEqual(tokenizeRegex('42'))
  })

  it('hex literal', () => {
    expect(tokenizeFSM('0xFF')).toEqual(tokenizeRegex('0xFF'))
  })

  it('octal literal', () => {
    expect(tokenizeFSM('0o17')).toEqual(tokenizeRegex('0o17'))
  })

  it('binary literal', () => {
    expect(tokenizeFSM('0b1010')).toEqual(tokenizeRegex('0b1010'))
  })

  it('decimal with fraction', () => {
    expect(tokenizeFSM('3.14')).toEqual(tokenizeRegex('3.14'))
  })

  it('exponent literal', () => {
    expect(tokenizeFSM('1.5e10')).toEqual(tokenizeRegex('1.5e10'))
  })

  it('bigint literal', () => {
    expect(tokenizeFSM('100n')).toEqual(tokenizeRegex('100n'))
  })

  it('numeric separators', () => {
    expect(tokenizeFSM('1_000_000')).toEqual(tokenizeRegex('1_000_000'))
  })

  it('leading dot decimal', () => {
    expect(tokenizeFSM('.5')).toEqual(tokenizeRegex('.5'))
  })

  it('double-quoted string', () => {
    expect(tokenizeFSM('"hello"')).toEqual(tokenizeRegex('"hello"'))
  })

  it('single-quoted string', () => {
    expect(tokenizeFSM('\'hello\'')).toEqual(tokenizeRegex('\'hello\''))
  })

  it('string with escape', () => {
    expect(tokenizeFSM('"a\\"b"')).toEqual(tokenizeRegex('"a\\"b"'))
  })

  it('string with unicode escape', () => {
    expect(tokenizeFSM('"\\u00E1"')).toEqual(tokenizeRegex('"\\u00E1"'))
  })

  it('template literal simple', () => {
    expect(tokenizeFSM('`abc`')).toEqual(tokenizeRegex('`abc`'))
  })

  it('template literal with interpolation', () => {
    expect(tokenizeFSM('`a${b}c`')).toEqual(tokenizeRegex('`a${b}c`'))
  })

  it('nested template literal', () => {
    expect(tokenizeFSM('`a${`b${c}d`}e`')).toEqual(tokenizeRegex('`a${`b${c}d`}e`'))
  })

  it('regex literal', () => {
    expect(tokenizeFSM('x = /abc/g')).toEqual(tokenizeRegex('x = /abc/g'))
  })

  it('division vs regex (after identifier)', () => {
    expect(tokenizeFSM('x / y')).toEqual(tokenizeRegex('x / y'))
  })

  it('regex with character class', () => {
    expect(tokenizeFSM('var r = /[a-z]+/i')).toEqual(tokenizeRegex('var r = /[a-z]+/i'))
  })

  it('all single-char operators', () => {
    expect(tokenizeFSM('+-*/%~!&|^?:.,;')).toEqual(tokenizeRegex('+-*/%~!&|^?:.,;'))
  })

  it('compound operator >>>=', () => {
    expect(tokenizeFSM('a >>>= b')).toEqual(tokenizeRegex('a >>>= b'))
  })

  it('arrow function tokens', () => {
    expect(tokenizeFSM('(a, b) => a + b')).toEqual(tokenizeRegex('(a, b) => a + b'))
  })

  it('all bracket types', () => {
    expect(tokenizeFSM('([{}])')).toEqual(tokenizeRegex('([{}])'))
  })

  it('english keyword: var', () => {
    expect(tokenizeFSM('var x = 1')).toEqual(tokenizeRegex('var x = 1'))
  })

  it('vietnamese keyword: khai báo', () => {
    expect(tokenizeFSM('khai báo x = 1')).toEqual(tokenizeRegex('khai báo x = 1'))
  })

  it('vietnamese keyword: phá vòng lặp', () => {
    expect(tokenizeFSM('phá vòng lặp')).toEqual(tokenizeRegex('phá vòng lặp'))
  })

  it('vietnamese keyword: kiểu của', () => {
    expect(tokenizeFSM('kiểu của x')).toEqual(tokenizeRegex('kiểu của x'))
  })

  it('multi-word identifier (no embedded keyword)', () => {
    expect(tokenizeFSM('khai báo con mèo đẹp = 1')).toEqual(tokenizeRegex('khai báo con mèo đẹp = 1'))
  })

  it('embedded keyword inside identifier should split', () => {
    const fsm = tokenizeFSM('khai báo một lớp gì đó = 1')
    const rx = tokenizeRegex('khai báo một lớp gì đó = 1')
    expect(fsm).toEqual(rx)
  })

  it('boolean keywords vi/en', () => {
    expect(tokenizeFSM('đúng sai true false')).toEqual(tokenizeRegex('đúng sai true false'))
  })

  it('null/Infinity/NaN/undefined', () => {
    expect(tokenizeFSM('null Infinity NaN undefined rỗng vô cực không xác định')).toEqual(tokenizeRegex('null Infinity NaN undefined rỗng vô cực không xác định'))
  })

  it('throw on unknown char', () => {
    expect(() => tokenizeFSM('@@@')).toThrow()
  })

  it('riêng tư followed by identifier should not consume trailing letters', () => {
    const t = tokenizeFSM('riêng tư x')
    expect(t).toHaveLength(2)
    expect(t[0].type).toBe(Keyword.PRIVATE)
    expect(t[1].value).toBe('x')
  })

  it('bảo vệ keyword followed by identifier', () => {
    const t = tokenizeFSM('bảo vệ phương thức')
    expect(t).toHaveLength(2)
    expect(t[0].type).toBe(Keyword.PROTECTED)
    expect(t[1].type).toBe(Keyword.IDENTIFIER)
  })
})

describe('tokenizer-fsm: produces identical output to regex tokenizer on bench fixtures', () => {
  for (const [name, source] of Object.entries(fixtures)) {
    it(`fixture parity: ${name}`, () => {
      const rx = tokenizeRegex(source)
      const fsm = tokenizeFSM(source)
      expect(fsm.length).toBe(rx.length)
      for (let i = 0; i < rx.length; i++) {
        expect({ idx: i, ...fsm[i] }).toEqual({ idx: i, ...rx[i] })
      }
    }, 60_000)
  }
})

describe('tokenizer-fsm: rollback works', () => {
  it('rollback decrements cursor and lookahead end', () => {
    const parser = new Parser()
    parser.syntax = 'abc; def'
    parser.tokenizer = new TokenizerFSM(parser)
    const first = parser.tokenizer.getNextToken()
    expect(first?.value).toBe('abc')
    const before = (parser.tokenizer as TokenizerFSM).getCursor()
    ;(parser.tokenizer as TokenizerFSM).rollback(2)
    expect((parser.tokenizer as TokenizerFSM).getCursor()).toBe(before - 2)
  })
})

describe('tokenizer-fsm: isEOF', () => {
  it('is true at end', () => {
    const parser = new Parser()
    parser.syntax = 'a'
    parser.tokenizer = new TokenizerFSM(parser)
    parser.tokenizer.getNextToken()
    expect(parser.tokenizer.isEOF()).toBe(true)
  })
})
