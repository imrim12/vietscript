import generate from '@babel/generator'

import { FunctionDeclaration } from '@parser/nodes/declarations/FunctionDeclaration'
import { Expression } from '@parser/nodes/expressions/Expression'

import parser from '../../../../setup-test'

describe('generator-yield-async.test', () => {
  it('should generate generator function', () => {
    const ast = parser.parse(`hàm* gen() { nhường 1 }`, FunctionDeclaration)
    expect(generate(ast).code).toMatchSnapshot()
  })

  it('should generate async generator function', () => {
    const ast = parser.parse(`bất đồng bộ hàm* gen() { nhường 1 }`, FunctionDeclaration)
    expect(generate(ast).code).toMatchSnapshot()
  })

  it('should generate yield delegation', () => {
    const ast = parser.parse(`nhường* other`, Expression)
    expect(generate(ast).code).toMatchSnapshot()
  })
})
