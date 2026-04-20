import type { ImportDeclaration } from '../import/ImportDeclaration'
import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'
import { Declaration } from '../Declaration'

describe('declaration-import.test', () => {
  it('should parse the syntax normally', () => {
    const result = parser.parse(`sử dụng "./test-path-1"`, Declaration)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'ImportDeclaration',
      specifiers: [],
      source: {
        type: 'StringLiteral',
        value: './test-path-1',
        extra: {
          rawValue: './test-path-1',
          raw: '"./test-path-1"',
        },
        start: 8,
        end: 23,
      },
      assertions: [],
    } as ImportDeclaration)
  })

  it('should parse the syntax normally', () => {
    const result = parser.parse(`sử dụng * như là abc từ "./test-path-2"`, Declaration)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'ImportDeclaration',
      importType: 'value',
      specifiers: [
        {
          type: 'ImportNamespaceSpecifier',
          local: {
            type: 'Identifier',
            name: 'abc',
          },
        },
      ],
      source: {
        type: 'StringLiteral',
        value: './test-path-2',
        extra: {
          rawValue: './test-path-2',
          raw: '"./test-path-2"',
        },
        start: 24,
        end: 39,
      },
      assertions: [],
    } as ImportDeclaration)
  })

  it('should parse the syntax normally', () => {
    const result = parser.parse(`sử dụng cái gì đó từ "./test-path-3"`, Declaration)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'ImportDeclaration',
      importType: 'value',
      specifiers: [
        {
          type: 'ImportDefaultSpecifier',
          local: {
            type: 'Identifier',
            name: 'cái_gì_đó',
          },
        },
      ],
      source: {
        type: 'StringLiteral',
        value: './test-path-3',
        extra: {
          rawValue: './test-path-3',
          raw: '"./test-path-3"',
        },
        start: 21,
        end: 36,
      },
      assertions: [],
    } as ImportDeclaration)
  })

  it('should parse the syntax normally', () => {
    const result = parser.parse(`sử dụng cái gì đó, { con cún : con chó con } từ "./test-path-4"`, Declaration)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'ImportDeclaration',
      specifiers: [
        {
          type: 'ImportDefaultSpecifier',
          local: {
            type: 'Identifier',
            name: 'cái_gì_đó',
          },
        },
        {
          type: 'ImportSpecifier',
          imported: {
            type: 'Identifier',
            name: 'con_cún',
          },
          local: {
            type: 'Identifier',
            name: 'con_chó_con',
          },
        },
      ],
      source: {
        type: 'StringLiteral',
        value: './test-path-4',
        extra: {
          rawValue: './test-path-4',
          raw: '"./test-path-4"',
        },
        start: 48,
        end: 63,
      },
      assertions: [],
      importType: 'value',
    } as ImportDeclaration)
  })
})
