import generate from '@babel/generator'

import { Expression } from '@parser/nodes/expressions/Expression'

import parser from '../../../../setup-test'

describe('generator-expression-spread.test', () => {
  it('should generate spread in array', () => {
    const ast = parser.parse(`[1, ...a, 2]`, Expression)
    const result = generate(ast)
    expect(result.code).toMatchSnapshot()
  })

  it('should generate spread in object', () => {
    const ast = parser.parse(`{ a: 1, ...o }`, Expression)
    const result = generate(ast)
    expect(result.code).toMatchSnapshot()
  })

  it('should generate spread in call', () => {
    const ast = parser.parse(`f(1, ...args)`, Expression)
    const result = generate(ast)
    expect(result.code).toMatchSnapshot()
  })
})
