import generate from '@babel/generator'

import { FunctionDeclaration } from '@parser/nodes/declarations/FunctionDeclaration'
import { VariableDeclaration } from '@parser/nodes/declarations/VariableDeclaration'

import parser from '../../../../setup-test'

describe('generator-array-pattern.test', () => {
  it('should generate simple array destructuring', () => {
    const ast = parser.parse(`khai báo [a, b] = arr`, VariableDeclaration)
    expect(generate(ast).code).toMatchSnapshot()
  })

  it('should generate default array destructuring', () => {
    const ast = parser.parse(`khai báo [a = 1] = arr`, VariableDeclaration)
    expect(generate(ast).code).toMatchSnapshot()
  })

  it('should generate rest array destructuring', () => {
    const ast = parser.parse(`khai báo [a, ...rest] = arr`, VariableDeclaration)
    expect(generate(ast).code).toMatchSnapshot()
  })

  it('should generate nested array pattern', () => {
    const ast = parser.parse(`khai báo [a, [b, c]] = arr`, VariableDeclaration)
    expect(generate(ast).code).toMatchSnapshot()
  })

  it('should generate array pattern in param', () => {
    const ast = parser.parse(`hàm f([a, b]) {}`, FunctionDeclaration)
    expect(generate(ast).code).toMatchSnapshot()
  })
})
