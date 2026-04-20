import { ClassDeclaration } from '@parser/nodes/declarations/ClassDeclaration'

import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('declaration-private-field.test', () => {
  it('should parse private field with initializer', () => {
    const result = parser.parse(
      `lớp Cat { #tuổi = 3 }`,
      ClassDeclaration,
    )

    expect(toPlainObject(result)).toMatchObject({
      type: 'ClassDeclaration',
      body: {
        type: 'ClassBody',
        body: [
          {
            type: 'ClassPrivateProperty',
            key: {
              type: 'PrivateName',
              id: { type: 'Identifier' },
            },
            value: { type: 'NumericLiteral', value: 3 },
          },
        ],
      },
    })
  })

  it('should parse private field without initializer', () => {
    const result = parser.parse(
      `lớp Cat { #tuổi }`,
      ClassDeclaration,
    )

    expect(toPlainObject(result)).toMatchObject({
      body: {
        body: [
          {
            type: 'ClassPrivateProperty',
            key: { type: 'PrivateName' },
            value: null,
          },
        ],
      },
    })
  })
})
