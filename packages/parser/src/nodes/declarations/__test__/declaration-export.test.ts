import type { ExportDeclaration } from '../export/ExportDeclaration'
import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'
import { Declaration } from '../Declaration'

describe('declaration-export.test', () => {
  it('should parse the syntax normally', () => {
    const result = parser.parse(`cho phép * từ "./test-path"`, Declaration)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'ExportAllDeclaration',
      source: {
        type: 'StringLiteral',
        value: './test-path',
        extra: {
          rawValue: './test-path',
          raw: '"./test-path"',
        },
        start: 14,
        end: 27,
      },
    } as ExportDeclaration)
  })

  it('should parse the syntax normally', () => {
    const result = parser.parse(`cho phép { tính năng gì đấy } từ "./test-path"`, Declaration)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'ExportNamedDeclaration',
      specifiers: [
        {
          type: 'ExportSpecifier',
          local: {
            type: 'Identifier',
            name: 'tính_năng_gì_đấy',
          },
          exported: {
            type: 'Identifier',
            name: 'tính_năng_gì_đấy',
          },
        },
      ],
      source: {
        type: 'StringLiteral',
        value: './test-path',
        extra: {
          rawValue: './test-path',
          raw: '"./test-path"',
        },
        start: 33,
        end: 46,
      },
    } as ExportDeclaration)
  })

  it('should parse the syntax normally', () => {
    const result = parser.parse(
      `cho phép {
        tính năng cộng: phương thức cộng,
        tính năng chia: phương thức chia,
        phương thức trừ
      } từ "./test-path"`,
      Declaration,
    )

    expect(toPlainObject(result)).toStrictEqual({
      type: 'ExportNamedDeclaration',
      specifiers: [
        {
          type: 'ExportSpecifier',
          local: {
            type: 'Identifier',
            name: 'tính_năng_cộng',
          },
          exported: {
            type: 'Identifier',
            name: 'phương_thức_cộng',
          },
        },
        {
          type: 'ExportSpecifier',
          local: {
            type: 'Identifier',
            name: 'tính_năng_chia',
          },
          exported: {
            type: 'Identifier',
            name: 'phương_thức_chia',
          },
        },
        {
          type: 'ExportSpecifier',
          local: {
            type: 'Identifier',
            name: 'phương_thức_trừ',
          },
          exported: {
            type: 'Identifier',
            name: 'phương_thức_trừ',
          },
        },
      ],
      source: {
        type: 'StringLiteral',
        value: './test-path',
        extra: {
          rawValue: './test-path',
          raw: '"./test-path"',
        },
        start: 130,
        end: 143,
      },
    } as ExportDeclaration)
  })

  it('should parse the syntax normally', () => {
    const result = parser.parse(`cho phép mặc định con mèo`, Declaration)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'ExportDefaultDeclaration',
      declaration: {
        type: 'Identifier',
        name: 'con_mèo',
      },
    } as ExportDeclaration)
  })
})
