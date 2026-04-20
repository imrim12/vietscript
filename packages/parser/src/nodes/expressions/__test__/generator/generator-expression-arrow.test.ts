import generate from '@babel/generator'

import { Expression } from '@parser/nodes/expressions/Expression'

import parser from '../../../../setup-test'

describe('generator-expression-arrow.test', () => {
  it('should generate javascript from single param arrow', () => {
    const ast = parser.parse(`x => x`, Expression)
    const result = generate(ast)
    expect(result.code).toMatchSnapshot()
  })

  it('should generate javascript from multi param arrow', () => {
    const ast = parser.parse(`(x, y) => x`, Expression)
    const result = generate(ast)
    expect(result.code).toMatchSnapshot()
  })

  it('should generate javascript from empty param arrow', () => {
    const ast = parser.parse(`() => 1`, Expression)
    const result = generate(ast)
    expect(result.code).toMatchSnapshot()
  })

  it('should generate javascript from block body arrow', () => {
    const ast = parser.parse(`() => { trả về 1 }`, Expression)
    const result = generate(ast)
    expect(result.code).toMatchSnapshot()
  })
})
