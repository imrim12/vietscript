import generate from '@babel/generator'

import { FunctionDeclaration } from '@parser/nodes/declarations/FunctionDeclaration'
import { VariableDeclaration } from '@parser/nodes/declarations/VariableDeclaration'

import parser from '../../../../setup-test'

describe('generator-object-pattern.test', () => {
  it('should generate shorthand destructuring', () => {
    const ast = parser.parse(`khai báo { a, b } = o`, VariableDeclaration)
    const result = generate(ast)
    expect(result.code).toMatchSnapshot()
  })

  it('should generate rename destructuring', () => {
    const ast = parser.parse(`khai báo { a: b } = o`, VariableDeclaration)
    const result = generate(ast)
    expect(result.code).toMatchSnapshot()
  })

  it('should generate default destructuring', () => {
    const ast = parser.parse(`khai báo { a = 1 } = o`, VariableDeclaration)
    const result = generate(ast)
    expect(result.code).toMatchSnapshot()
  })

  it('should generate rest destructuring', () => {
    const ast = parser.parse(`khai báo { a, ...rest } = o`, VariableDeclaration)
    const result = generate(ast)
    expect(result.code).toMatchSnapshot()
  })

  it('should generate destructuring in function param', () => {
    const ast = parser.parse(`hàm f({ a, b }) {}`, FunctionDeclaration)
    const result = generate(ast)
    expect(result.code).toMatchSnapshot()
  })
})
