import type { AssignmentExpression } from '../AssignmentExpression'

import type { MemberExpression } from '../MemberExpression'
import { Expression } from '@parser/nodes/expressions/Expression'
import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('expression-member.test', () => {
  it('should parse the syntax normally', () => {
    const result = parser.parse('con chó.chân phải.móng chân.độ dài', Expression)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'MemberExpression',
      object: {
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
          name: 'móng_chân',
        },
        computed: false,
        optional: false,
      },
      property: {
        type: 'Identifier',
        name: 'độ_dài',
      },
      computed: false,
      optional: false,
    } as MemberExpression)
  })

  it('should parse the syntax normally', () => {
    const result = parser.parse('con chó[chân phải].móng chân.độ dài', Expression)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'MemberExpression',
      object: {
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
          computed: true,
          optional: false,
        },
        property: {
          type: 'Identifier',
          name: 'móng_chân',
        },
        computed: false,
        optional: false,
      },
      property: {
        type: 'Identifier',
        name: 'độ_dài',
      },
      computed: false,
      optional: false,
    } as MemberExpression)
  })

  it('should parse the syntax normally', () => {
    const result = parser.parse('con chó.chân phải.móng chân.độ dài = 123', Expression)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'AssignmentExpression',
      left: {
        type: 'MemberExpression',
        object: {
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
            name: 'móng_chân',
          },
          computed: false,
          optional: false,
        },
        property: {
          type: 'Identifier',
          name: 'độ_dài',
        },
        computed: false,
        optional: false,
      },
      operator: '=',
      right: {
        type: 'NumericLiteral',
        value: 123,
        extra: {
          rawValue: 123,
          raw: '123',
        },
        start: 37,
        end: 40,
      },
    } as AssignmentExpression)
  })
})
