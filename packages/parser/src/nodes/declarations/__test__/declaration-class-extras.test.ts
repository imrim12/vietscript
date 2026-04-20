import { ClassDeclaration } from '@parser/nodes/declarations/ClassDeclaration'

import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('declaration-class-extras.test', () => {
  it('should parse static property', () => {
    const result = parser.parse(`lớp A { static x = 1 }`, ClassDeclaration)
    expect(toPlainObject(result)).toMatchObject({
      body: {
        body: [
          {
            type: 'ClassProperty',
            static: true,
            key: { type: 'Identifier', name: 'x' },
          },
        ],
      },
    })
  })

  it('should parse static method', () => {
    const result = parser.parse(`lớp A { static foo() {} }`, ClassDeclaration)
    expect(toPlainObject(result)).toMatchObject({
      body: {
        body: [
          {
            type: 'ClassMethod',
            static: true,
          },
        ],
      },
    })
  })

  it('should parse tĩnh as static (Vietnamese)', () => {
    const result = parser.parse(`lớp A { tĩnh x = 1 }`, ClassDeclaration)
    expect(toPlainObject(result)).toMatchObject({
      body: {
        body: [{ static: true }],
      },
    })
  })

  it('should parse super.method call', () => {
    const result = parser.parse(
      `lớp B kế thừa A {
        khởi tạo() { khởi tạo cha() }
      }`,
      ClassDeclaration,
    )
    expect(toPlainObject(result)).toMatchObject({
      type: 'ClassDeclaration',
      superClass: { type: 'Identifier' },
    })
  })

  it('should parse generator method', () => {
    const result = parser.parse(
      `lớp A {
        *foo() {
          nhường 1
        }
      }`,
      ClassDeclaration,
    )
    const plain = toPlainObject(result) as any
    expect(plain.type).toBe('ClassDeclaration')
  })

  it('should parse access modifiers', () => {
    const result = parser.parse(
      `lớp A {
        công khai x = 1
        riêng tư y = 2
        bảo vệ z = 3
      }`,
      ClassDeclaration,
    )
    const plain = toPlainObject(result) as any
    expect(plain.body.body).toHaveLength(3)
  })
})
