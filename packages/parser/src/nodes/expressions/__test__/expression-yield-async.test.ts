import { FunctionDeclaration } from '@parser/nodes/declarations/FunctionDeclaration'
import { Expression } from '@parser/nodes/expressions/Expression'

import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('expression-yield-async.test', () => {
  it('should parse generator function', () => {
    const result = parser.parse(`hàm* gen() { nhường 1 }`, FunctionDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      type: 'FunctionDeclaration',
      generator: true,
      async: false,
      body: {
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'YieldExpression',
              delegate: false,
              argument: { type: 'NumericLiteral', value: 1 },
            },
          },
        ],
      },
    })
  })

  it('should parse async generator function', () => {
    const result = parser.parse(`bất đồng bộ hàm* gen() { nhường 1 }`, FunctionDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      type: 'FunctionDeclaration',
      generator: true,
      async: true,
    })
  })

  it('should parse yield delegation', () => {
    const result = parser.parse(`nhường* other`, Expression)

    expect(toPlainObject(result)).toMatchObject({
      type: 'YieldExpression',
      delegate: true,
      argument: { type: 'Identifier', name: 'other' },
    })
  })

  it('should parse bare yield', () => {
    const result = parser.parse(`nhường`, Expression)

    expect(toPlainObject(result)).toMatchObject({
      type: 'YieldExpression',
      delegate: false,
      argument: null,
    })
  })

  it('should parse await expression', () => {
    const result = parser.parse(`chờ promise`, Expression)

    expect(toPlainObject(result)).toMatchObject({
      type: 'AwaitExpression',
      argument: { type: 'Identifier', name: 'promise' },
    })
  })
})
