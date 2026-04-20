import generate from '@babel/generator'

import { Expression } from '@parser/nodes/expressions/Expression'

import parser from '../../../../setup-test'

describe('generator-literal-template.test', () => {
  it('should generate plain template', () => {
    const ast = parser.parse('`Xin chào!`', Expression)
    expect(generate(ast).code).toMatchSnapshot()
  })

  it('should generate single interpolation', () => {
    const ast = parser.parse('`Xin chào ${ten}!`', Expression)
    expect(generate(ast).code).toMatchSnapshot()
  })

  it('should generate multiple interpolations', () => {
    const ast = parser.parse('`${a}-${b}-${c}`', Expression)
    expect(generate(ast).code).toMatchSnapshot()
  })
})
