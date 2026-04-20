import generate from '@babel/generator'

import parser from '../../../../setup-test'
import { Expression } from '../../Expression'

describe('generator-expression-call.test', () => {
  it('should generate chained dot member access', () => {
    const code = `con chó.chân phải.móng chân.độ dài`

    const ast = parser.parse(code, Expression)

    const result = generate(ast)

    expect(result.code).toBe(`con_chó.chân_phải.móng_chân.độ_dài`)
  })

  it('should generate bracket member access', () => {
    const code = `con chó[chân phải].móng chân.độ dài`

    const ast = parser.parse(code, Expression)

    const result = generate(ast)

    expect(result.code).toBe(`con_chó[chân_phải].móng_chân.độ_dài`)
  })

  it('should generate member assignment', () => {
    const code = `con chó.chân phải.móng chân.độ dài = 123`

    const ast = parser.parse(code, Expression)

    const result = generate(ast)

    expect(result.code).toBe(`con_chó.chân_phải.móng_chân.độ_dài = 123`)
  })
})
