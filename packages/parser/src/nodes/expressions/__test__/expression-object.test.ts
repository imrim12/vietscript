import type { ObjectExpression } from '../ObjectExpression'
import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'
import { Expression } from '../Expression'

describe('expression-object.test', () => {
  it('should parse the syntax normally', () => {
    const result = parser.parse(
      `
		{
      tiếng kêu: "Meo meo",
			số chân: 4,
			bất đồng bộ kêu(số lần, hmm) {
				trả về "Meo meo"
			}
		}
		`,
      Expression,
    )
    expect(toPlainObject(result)).toStrictEqual({
      type: 'ObjectExpression',
      properties: [
        {
          type: 'ObjectProperty',
          method: false,
          computed: false,
          shorthand: false,
          key: {
            type: 'Identifier',
            name: 'tiếng_kêu',
          },
          value: {
            type: 'StringLiteral',
            value: 'Meo meo',
            extra: {
              rawValue: 'Meo meo',
              raw: '"Meo meo"',
            },
            start: 22,
            end: 31,
          },
        },
        {
          type: 'ObjectProperty',
          method: false,
          computed: false,
          shorthand: false,
          key: {
            type: 'Identifier',
            name: 'số_chân',
          },
          value: {
            type: 'NumericLiteral',
            value: 4,
            extra: {
              rawValue: 4,
              raw: '4',
            },
            start: 45,
            end: 46,
          },
        },
        {
          type: 'ObjectMethod',
          method: true,
          key: {
            type: 'Identifier',
            name: 'kêu',
          },
          computed: false,
          kind: 'method',
          generator: false,
          async: true,
          params: [
            {
              type: 'Identifier',
              name: 'số_lần',
            },
            {
              type: 'Identifier',
              name: 'hmm',
            },
          ],
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ReturnStatement',
                argument: {
                  type: 'StringLiteral',
                  value: 'Meo meo',
                  extra: {
                    rawValue: 'Meo meo',
                    raw: '"Meo meo"',
                  },
                  start: 93,
                  end: 102,
                },
              },
            ],
            directives: [],
          },
        },
      ],
    } as ObjectExpression)
  })

  it('should parse empty object `{}`', () => {
    const result = parser.parse(`{}`, Expression)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'ObjectExpression',
      properties: [],
    } as ObjectExpression)
  })
})
