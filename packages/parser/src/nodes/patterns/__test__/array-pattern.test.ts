import { FunctionDeclaration } from '@parser/nodes/declarations/FunctionDeclaration'
import { VariableDeclaration } from '@parser/nodes/declarations/VariableDeclaration'

import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('array-pattern.test', () => {
  it('should parse simple array destructuring', () => {
    const result = parser.parse(`khai báo [a, b] = arr`, VariableDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      declarations: [
        {
          id: {
            type: 'ArrayPattern',
            elements: [
              { type: 'Identifier', name: 'a' },
              { type: 'Identifier', name: 'b' },
            ],
          },
        },
      ],
    })
  })

  it('should parse hole in array destructuring', () => {
    const result = parser.parse(`khai báo [, b] = arr`, VariableDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      declarations: [
        {
          id: {
            type: 'ArrayPattern',
            elements: [null, { type: 'Identifier', name: 'b' }],
          },
        },
      ],
    })
  })

  it('should parse default in array destructuring', () => {
    const result = parser.parse(`khai báo [a = 1] = arr`, VariableDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      declarations: [
        {
          id: {
            elements: [
              {
                type: 'AssignmentPattern',
                left: { type: 'Identifier', name: 'a' },
                right: { type: 'NumericLiteral', value: 1 },
              },
            ],
          },
        },
      ],
    })
  })

  it('should parse rest in array destructuring', () => {
    const result = parser.parse(`khai báo [a, ...rest] = arr`, VariableDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      declarations: [
        {
          id: {
            elements: [
              { type: 'Identifier', name: 'a' },
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

  it('should parse nested array pattern', () => {
    const result = parser.parse(`khai báo [a, [b, c]] = arr`, VariableDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      declarations: [
        {
          id: {
            elements: [
              { type: 'Identifier', name: 'a' },
              {
                type: 'ArrayPattern',
                elements: [
                  { type: 'Identifier', name: 'b' },
                  { type: 'Identifier', name: 'c' },
                ],
              },
            ],
          },
        },
      ],
    })
  })

  it('should parse mixed with object pattern', () => {
    const result = parser.parse(`khai báo [{a}, b] = arr`, VariableDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      declarations: [
        {
          id: {
            elements: [
              {
                type: 'ObjectPattern',
                properties: [{ type: 'ObjectProperty' }],
              },
              { type: 'Identifier', name: 'b' },
            ],
          },
        },
      ],
    })
  })

  it('should parse array destructuring in function param', () => {
    const result = parser.parse(`hàm f([a, b]) {}`, FunctionDeclaration)

    expect(toPlainObject(result)).toMatchObject({
      params: [
        {
          type: 'ArrayPattern',
          elements: [
            { type: 'Identifier', name: 'a' },
            { type: 'Identifier', name: 'b' },
          ],
        },
      ],
    })
  })
})
