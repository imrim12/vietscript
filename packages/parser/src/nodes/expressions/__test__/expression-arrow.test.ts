import { Expression } from '@parser/nodes/expressions/Expression'

import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('expression-arrow.test', () => {
  it('should parse single param without paren', () => {
    const result = parser.parse(`x => x`, Expression)

    expect(toPlainObject(result)).toMatchObject({
      type: 'ArrowFunctionExpression',
      async: false,
      generator: false,
      expression: true,
      params: [{ type: 'Identifier', name: 'x' }],
      body: { type: 'Identifier', name: 'x' },
    })
  })

  it('should parse single param with paren', () => {
    const result = parser.parse(`(x) => x`, Expression)

    expect(toPlainObject(result)).toMatchObject({
      type: 'ArrowFunctionExpression',
      params: [{ type: 'Identifier', name: 'x' }],
      body: { type: 'Identifier', name: 'x' },
    })
  })

  it('should parse multiple params', () => {
    const result = parser.parse(`(x, y) => x`, Expression)

    expect(toPlainObject(result)).toMatchObject({
      type: 'ArrowFunctionExpression',
      params: [
        { type: 'Identifier', name: 'x' },
        { type: 'Identifier', name: 'y' },
      ],
    })
  })

  it('should parse empty params', () => {
    const result = parser.parse(`() => 1`, Expression)

    expect(toPlainObject(result)).toMatchObject({
      type: 'ArrowFunctionExpression',
      params: [],
      body: { type: 'NumericLiteral', value: 1 },
    })
  })

  it('should parse block body', () => {
    const result = parser.parse(`() => { trả về 1 }`, Expression)

    expect(toPlainObject(result)).toMatchObject({
      type: 'ArrowFunctionExpression',
      expression: false,
      body: { type: 'BlockStatement' },
    })
  })
})
