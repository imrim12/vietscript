import generate from '@babel/generator'

import parser from '../../../../setup-test'
import { Expression } from '../../Expression'

describe('generator-expression-array.test', () => {
  it('should parse the syntax normally', () => {
    const code = `[1, "a", đúng, sai, "đúng", "true", NaN]`

    const ast = parser.parse(code, Expression)

    const result = generate(ast)

    expect(result.code).toBe(`[1, "a", true, false, "đúng", "true", NaN]`)
  })
})
