import { Expression } from '@parser/nodes/expressions/Expression'

import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('expression-operators.test', () => {
  describe('bitwise operators', () => {
    const cases: Array<[string, string]> = [
      ['&', 'a & b'],
      ['|', 'a | b'],
      ['^', 'a ^ b'],
      ['>>', 'a >> b'],
      ['>>>', 'a >>> b'],
      ['<<', 'a << b'],
    ]

    for (const [op, code] of cases) {
      it(`should parse ${op}`, () => {
        const result = parser.parse(code, Expression)
        expect(toPlainObject(result)).toMatchObject({
          type: 'BinaryExpression',
          operator: op,
        })
      })
    }
  })

  describe('unary operators', () => {
    it('should parse typeof', () => {
      const result = parser.parse(`typeof x`, Expression)
      expect(toPlainObject(result)).toMatchObject({
        type: 'UnaryExpression',
        operator: 'typeof',
        argument: { type: 'Identifier', name: 'x' },
      })
    })

    it('should parse void', () => {
      const result = parser.parse(`void 0`, Expression)
      expect(toPlainObject(result)).toMatchObject({
        type: 'UnaryExpression',
        operator: 'void',
      })
    })

    it('should parse delete', () => {
      const result = parser.parse(`xoá o.x`, Expression)
      expect(toPlainObject(result)).toMatchObject({
        type: 'UnaryExpression',
        operator: 'delete',
      })
    })

    it('should parse ! (not)', () => {
      const result = parser.parse(`!x`, Expression)
      expect(toPlainObject(result)).toMatchObject({
        type: 'UnaryExpression',
        operator: '!',
      })
    })
  })

  describe('nullish coalescing', () => {
    it('should parse a ?? b', () => {
      const result = parser.parse(`a ?? b`, Expression)
      expect(toPlainObject(result)).toMatchObject({
        type: 'LogicalExpression',
        operator: '??',
      })
    })
  })

  describe('this and new', () => {
    it('should parse this', () => {
      const result = parser.parse(`this`, Expression)
      expect(toPlainObject(result)).toMatchObject({
        type: 'ThisExpression',
      })
    })

    it('should parse đây (Vietnamese this)', () => {
      const result = parser.parse(`đây`, Expression)
      expect(toPlainObject(result)).toMatchObject({
        type: 'ThisExpression',
      })
    })

    it('should parse new A()', () => {
      const result = parser.parse(`new A()`, Expression)
      expect(toPlainObject(result)).toMatchObject({
        type: 'NewExpression',
        callee: { type: 'Identifier', name: 'A' },
      })
    })
  })
})
