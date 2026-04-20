import type { VariableDeclaration } from '@parser/nodes/declarations/VariableDeclaration'

import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'
import { Declaration } from '../Declaration'

describe('declaration-variable.test', () => {
  it('should parse `var a = 1`', () => {
    const result = parser.parse(`var a = 1`, Declaration)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'a',
          },
          init: {
            type: 'NumericLiteral',
            value: 1,
            extra: {
              rawValue: 1,
              raw: '1',
            },
            start: 8,
            end: 9,
          },
        },
      ],
      kind: 'var',
    } as VariableDeclaration)
  })

  it('should parse `var a = 1, b`', () => {
    const result = parser.parse(`var a = 1, b`, Declaration)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'a',
          },
          init: {
            type: 'NumericLiteral',
            value: 1,
            extra: {
              rawValue: 1,
              raw: '1',
            },
            start: 8,
            end: 9,
          },
        },
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'b',
          },
          init: null,
        },
      ],
      kind: 'var',
    } as VariableDeclaration)
  })

  it('should parse `let a = 1`', () => {
    const result = parser.parse(`let a = 1`, Declaration)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'a',
          },
          init: {
            type: 'NumericLiteral',
            value: 1,
            extra: {
              rawValue: 1,
              raw: '1',
            },
            start: 8,
            end: 9,
          },
        },
      ],
      kind: 'let',
    } as VariableDeclaration)
  })

  it('should parse `let a = 1, b`', () => {
    const result = parser.parse(`let a = 1, b`, Declaration)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'a',
          },
          init: {
            type: 'NumericLiteral',
            value: 1,
            extra: {
              rawValue: 1,
              raw: '1',
            },
            start: 8,
            end: 9,
          },
        },
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'b',
          },
          init: null,
        },
      ],
      kind: 'let',
    } as VariableDeclaration)
  })

  it('should parse `const a = 1`', () => {
    const result = parser.parse(`const a = 1`, Declaration)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'a',
          },
          init: {
            type: 'NumericLiteral',
            value: 1,
            extra: {
              rawValue: 1,
              raw: '1',
            },
            start: 10,
            end: 11,
          },
        },
      ],
      kind: 'const',
    } as VariableDeclaration)
  })

  it('should parse `khai báo số một = 1`', () => {
    const result = parser.parse(`khai báo số một = 1`, Declaration)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'số_một',
          },
          init: {
            type: 'NumericLiteral',
            value: 1,
            extra: {
              rawValue: 1,
              raw: '1',
            },
            start: 18,
            end: 19,
          },
        },
      ],
      kind: 'var',
    } as VariableDeclaration)
  })

  it('should parse `khai báo a = 1, b`', () => {
    const result = parser.parse(`khai báo a = 1, b`, Declaration)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'a',
          },
          init: {
            type: 'NumericLiteral',
            value: 1,
            extra: {
              rawValue: 1,
              raw: '1',
            },
            start: 13,
            end: 14,
          },
        },
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'b',
          },
          init: null,
        },
      ],
      kind: 'var',
    } as VariableDeclaration)
  })

  it('should parse `hằng số họ và tên = "Nguyễn"`', () => {
    const result = parser.parse(`hằng số họ và tên = "Nguyễn"`, Declaration)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'họ_và_tên',
          },
          init: {
            type: 'StringLiteral',
            value: 'Nguyễn',
            extra: {
              rawValue: 'Nguyễn',
              raw: '"Nguyễn"',
            },
            start: 20,
            end: 28,
          },
        },
      ],
      kind: 'const',
    } as VariableDeclaration)
  })

  it('should parse `khai báo tuổi = không xác định, tên = "Nhi"`', () => {
    const result = parser.parse(`khai báo tuổi = không xác định, tên = "Nhi"`, Declaration)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'tuổi',
          },
          init: {
            type: 'Identifier',
            name: 'undefined',
            start: 16,
            end: 30,
          },
        },
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'tên',
          },
          init: {
            type: 'StringLiteral',
            value: 'Nhi',
            extra: {
              rawValue: 'Nhi',
              raw: '"Nhi"',
            },
            start: 38,
            end: 43,
          },
        },
      ],
      kind: 'var',
    } as VariableDeclaration)
  })
})
