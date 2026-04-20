import { Program } from '@parser/nodes/Program'

import parser from '../setup-test'
import toPlainObject from '../toPlainObject'

describe('identifier-match-keyword.test', () => {
  it('should tokenize embedded keyword as separator, not as part of identifier', () => {
    expect(() => {
      parser.parse(`khai báo một lớp gì đó = 1`, Program)
    }).toThrowError()
  })

  it('should parse multi-word identifier without embedded keyword', () => {
    const result = parser.parse(`khai báo con mèo đẹp = 1`, Program)

    expect(toPlainObject(result)).toMatchObject({
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: { type: 'Identifier' },
              init: { type: 'NumericLiteral', value: 1 },
            },
          ],
          kind: 'var',
        },
      ],
    })
  })

  it('should show the syntax error when identifier starts with keyword', () => {
    expect(() => {
      parser.parse('khai báo lớp gì đó = 1', Program)
    }).toThrowError(/Unexpected token: "lớp"/)
  })
})
