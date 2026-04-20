import { Expression } from '@parser/nodes/expressions/Expression'

import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('expression-new.test', () => {
  it('should parse new without args', () => {
    const result = parser.parse(`new Cat`, Expression)
    expect(toPlainObject(result)).toMatchObject({
      type: 'NewExpression',
      callee: { type: 'Identifier', name: 'Cat' },
      arguments: [],
    })
  })

  it('should parse new with args', () => {
    const result = parser.parse(`new Cat("Mimi", 3)`, Expression)
    expect(toPlainObject(result)).toMatchObject({
      type: 'NewExpression',
      callee: { type: 'Identifier', name: 'Cat' },
      arguments: [
        { type: 'StringLiteral', value: 'Mimi' },
        { type: 'NumericLiteral', value: 3 },
      ],
    })
  })

  it('should parse new with spread', () => {
    const result = parser.parse(`new Cat(...args)`, Expression)
    expect(toPlainObject(result)).toMatchObject({
      type: 'NewExpression',
      arguments: [
        {
          type: 'SpreadElement',
          argument: { type: 'Identifier', name: 'args' },
        },
      ],
    })
  })
})
