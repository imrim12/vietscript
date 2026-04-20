import { Expression } from '@parser/nodes/expressions/Expression'

import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('expression-spread.test', () => {
  it('should parse spread in array', () => {
    const result = parser.parse(`[1, ...a, 2]`, Expression)

    expect(toPlainObject(result)).toMatchObject({
      type: 'ArrayExpression',
      elements: [
        { type: 'NumericLiteral', value: 1 },
        {
          type: 'SpreadElement',
          argument: { type: 'Identifier', name: 'a' },
        },
        { type: 'NumericLiteral', value: 2 },
      ],
    })
  })

  it('should parse spread-only array', () => {
    const result = parser.parse(`[...a]`, Expression)

    expect(toPlainObject(result)).toMatchObject({
      type: 'ArrayExpression',
      elements: [
        {
          type: 'SpreadElement',
          argument: { type: 'Identifier', name: 'a' },
        },
      ],
    })
  })

  it('should parse spread in object', () => {
    const result = parser.parse(`{ a: 1, ...o }`, Expression)

    expect(toPlainObject(result)).toMatchObject({
      type: 'ObjectExpression',
      properties: [
        { type: 'ObjectProperty' },
        {
          type: 'SpreadElement',
          argument: { type: 'Identifier', name: 'o' },
        },
      ],
    })
  })
})
