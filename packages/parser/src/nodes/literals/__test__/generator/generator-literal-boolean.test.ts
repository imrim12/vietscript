import generate from '@babel/generator'
import { Literal } from '@parser/nodes/literals/Literal'

import parser from '../../../../setup-test'

describe('generator-literal-boolean.test', () => {
  it('should generate "đúng"', () => {
    const code = 'đúng'

    const ast = parser.parse(code, Literal)

    const result = generate(ast)

    expect(result.code).toMatchSnapshot()
  })

  it('should generate "sai"', () => {
    const code = 'sai'

    const ast = parser.parse(code, Literal)

    const result = generate(ast)

    expect(result.code).toMatchSnapshot()
  })
})
