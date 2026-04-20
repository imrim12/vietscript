import generate from '@babel/generator'

import { ForStatement } from '@parser/nodes/statements/breakable/iteration/ForStatement'

import parser from '../../../../../setup-test'

describe('generator-statement-for.test', () => {
  it('should generate traditional for', () => {
    const ast = parser.parse(`lặp (khai báo i = 0; i < 10; i++) {}`, ForStatement)
    expect(generate(ast).code).toMatchSnapshot()
  })

  it('should generate for-of', () => {
    const ast = parser.parse(`lặp (biến x của arr) {}`, ForStatement)
    expect(generate(ast).code).toMatchSnapshot()
  })

  it('should generate for-in', () => {
    const ast = parser.parse(`lặp (biến k trong obj) {}`, ForStatement)
    expect(generate(ast).code).toMatchSnapshot()
  })

  it('should generate for-await-of', () => {
    const ast = parser.parse(`lặp chờ (biến x của arr) {}`, ForStatement)
    expect(generate(ast).code).toMatchSnapshot()
  })
})
