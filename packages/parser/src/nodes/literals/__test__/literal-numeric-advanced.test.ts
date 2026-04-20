import { Literal } from '@parser/nodes/literals/Literal'

import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('literal-numeric-advanced.test', () => {
  const decimalCases: Array<[string, number]> = [
    ['42', 42],
    ['3.14', 3.14],
    ['.5', 0.5],
    ['1e3', 1000],
    ['1_000_000', 1_000_000],
    ['1.5e2', 150],
  ]

  for (const [input, expected] of decimalCases) {
    it(`should parse "${input}" as ${expected}`, () => {
      const result = parser.parse(input, Literal)
      expect(toPlainObject(result)).toMatchObject({
        type: 'NumericLiteral',
        value: expected,
      })
    })
  }

  it('should parse hex literal', () => {
    const result = parser.parse('0xff', Literal)
    expect(toPlainObject(result)).toMatchObject({
      type: 'NumericLiteral',
      value: 255,
    })
  })

  it('should parse octal literal', () => {
    const result = parser.parse('0o17', Literal)
    expect(toPlainObject(result)).toMatchObject({
      type: 'NumericLiteral',
      value: 15,
    })
  })

  it('should parse binary literal', () => {
    const result = parser.parse('0b1010', Literal)
    expect(toPlainObject(result)).toMatchObject({
      type: 'NumericLiteral',
      value: 10,
    })
  })

  it('should parse BigInt literal', () => {
    const result = parser.parse('123n', Literal)
    expect(toPlainObject(result)).toMatchObject({
      type: 'BigIntLiteral',
      value: '123',
    })
  })

  it('should parse hex BigInt', () => {
    const result = parser.parse('0xffn', Literal)
    expect(toPlainObject(result)).toMatchObject({
      type: 'BigIntLiteral',
      value: '0xff',
    })
  })

  it('should parse numeric separator in hex', () => {
    const result = parser.parse('0xff_ff', Literal)
    expect(toPlainObject(result)).toMatchObject({
      type: 'NumericLiteral',
      value: 0xFFFF,
    })
  })
})
