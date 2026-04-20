import { ClassDeclaration } from '@parser/nodes/declarations/ClassDeclaration'
import { Expression } from '@parser/nodes/expressions/Expression'

import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('declaration-getter-setter.test', () => {
  it('should parse getter in class', () => {
    const result = parser.parse(`lớp Cat { lấy tuổi() { trả về 3 } }`, ClassDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      body: {
        body: [
          {
            type: 'ClassMethod',
            kind: 'get',
            key: { type: 'Identifier' },
          },
        ],
      },
    })
  })

  it('should parse setter in class', () => {
    const result = parser.parse(`lớp Cat { gán tuổi(v) {} }`, ClassDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      body: {
        body: [
          {
            type: 'ClassMethod',
            kind: 'set',
            key: { type: 'Identifier' },
            params: [{ type: 'Identifier' }],
          },
        ],
      },
    })
  })

  it('should parse getter in object literal', () => {
    const result = parser.parse(`{ lấy tuổi() { trả về 3 } }`, Expression)

    expect(toPlainObject(result)).toMatchObject({
      type: 'ObjectExpression',
      properties: [
        {
          type: 'ObjectMethod',
          kind: 'get',
        },
      ],
    })
  })

  it('should parse setter in object literal', () => {
    const result = parser.parse(`{ gán tuổi(v) {} }`, Expression)

    expect(toPlainObject(result)).toMatchObject({
      properties: [
        {
          type: 'ObjectMethod',
          kind: 'set',
        },
      ],
    })
  })
})
