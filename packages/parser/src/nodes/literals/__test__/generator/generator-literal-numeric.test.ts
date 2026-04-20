import generate from '@babel/generator'
import { Literal } from '@parser/nodes/literals/Literal'

import parser from '../../../../setup-test'

describe('generator-literal-numeric.test', () => {
  it('should generate "0"', () => {
    const code = '0'

    const ast = parser.parse(code, Literal)

    const result = generate(ast)

    expect(result.code).toMatchSnapshot()
  })

  it('should generate "0.001123"', () => {
    const code = '0.001123'

    const ast = parser.parse(code, Literal)

    const result = generate(ast)

    expect(result.code).toMatchSnapshot()
  })

  it('should generate "70E-3"', () => {
    const code = '70E-3'

    const ast = parser.parse(code, Literal)

    const result = generate(ast)

    expect(result.code).toMatchSnapshot()
  })
})
