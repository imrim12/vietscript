import type { CallExpression } from '../CallExpression'

import { Expression } from '@parser/nodes/expressions/Expression'
import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('expression-call.test', () => {
  it('should parse simple call', () => {
    const result = parser.parse('con chó.kêu()', Expression)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'CallExpression',
      arguments: [],
      optional: false,
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'con_chó',
        },
        property: {
          type: 'Identifier',
          name: 'kêu',
        },
        computed: false,
        optional: false,
      },
    } as CallExpression)
  })

  it('should parse chained member call', () => {
    const result = parser.parse('con chó.chân phải.đá()', Expression)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'CallExpression',
      arguments: [],
      optional: false,
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: 'con_chó',
          },
          property: {
            type: 'Identifier',
            name: 'chân_phải',
          },
          computed: false,
          optional: false,
        },
        property: {
          type: 'Identifier',
          name: 'đá',
        },
        computed: false,
        optional: false,
      },
    } as CallExpression)
  })

  it('should parse computed member call', () => {
    const result = parser.parse('con chó[chân].đá()', Expression)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'CallExpression',
      arguments: [],
      optional: false,
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: 'con_chó',
          },
          property: {
            type: 'Identifier',
            name: 'chân',
          },
          computed: true,
          optional: false,
        },
        property: {
          type: 'Identifier',
          name: 'đá',
        },
        computed: false,
        optional: false,
      },
    } as CallExpression)
  })
})
