import { FunctionDeclaration } from '@parser/nodes/declarations/FunctionDeclaration'
import { VariableDeclaration } from '@parser/nodes/declarations/VariableDeclaration'

import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('object-pattern.test', () => {
  it('should parse shorthand destructuring', () => {
    const result = parser.parse(`khai báo { a, b } = o`, VariableDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      type: 'VariableDeclaration',
      declarations: [
        {
          id: {
            type: 'ObjectPattern',
            properties: [
              {
                type: 'ObjectProperty',
                shorthand: true,
                key: { type: 'Identifier', name: 'a' },
                value: { type: 'Identifier', name: 'a' },
              },
              {
                type: 'ObjectProperty',
                shorthand: true,
                key: { type: 'Identifier', name: 'b' },
                value: { type: 'Identifier', name: 'b' },
              },
            ],
          },
          init: { type: 'Identifier', name: 'o' },
        },
      ],
    })
  })

  it('should parse rename destructuring', () => {
    const result = parser.parse(`khai báo { a: b } = o`, VariableDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      declarations: [
        {
          id: {
            type: 'ObjectPattern',
            properties: [
              {
                type: 'ObjectProperty',
                shorthand: false,
                key: { type: 'Identifier', name: 'a' },
                value: { type: 'Identifier', name: 'b' },
              },
            ],
          },
        },
      ],
    })
  })

  it('should parse default in destructuring', () => {
    const result = parser.parse(`khai báo { a = 1 } = o`, VariableDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      declarations: [
        {
          id: {
            properties: [
              {
                value: {
                  type: 'AssignmentPattern',
                  left: { type: 'Identifier', name: 'a' },
                  right: { type: 'NumericLiteral', value: 1 },
                },
              },
            ],
          },
        },
      ],
    })
  })

  it('should parse rest in destructuring', () => {
    const result = parser.parse(`khai báo { a, ...rest } = o`, VariableDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      declarations: [
        {
          id: {
            properties: [
              { type: 'ObjectProperty' },
              {
                type: 'RestElement',
                argument: { type: 'Identifier', name: 'rest' },
              },
            ],
          },
        },
      ],
    })
  })

  it('should parse nested object pattern', () => {
    const result = parser.parse(`khai báo { a: { b } } = o`, VariableDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      declarations: [
        {
          id: {
            properties: [
              {
                value: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      key: { type: 'Identifier', name: 'b' },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    })
  })

  it('should parse destructuring in function param', () => {
    const result = parser.parse(`hàm f({ a, b }) {}`, FunctionDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      params: [
        {
          type: 'ObjectPattern',
          properties: [{ type: 'ObjectProperty' }, { type: 'ObjectProperty' }],
        },
      ],
    })
  })
})
