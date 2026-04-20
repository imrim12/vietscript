import generate from '@babel/generator'

import parser from '../../../../setup-test'
import { Expression } from '../../Expression'

describe('generator-expression-call.test', () => {
  it('should generate simple call', () => {
    const code = `con chó.kêu()`

    const ast = parser.parse(code, Expression)

    const result = generate(ast)

    expect(result.code).toBe(`con_chó.kêu()`)
  })

  it('should generate nested member call', () => {
    const code = `con chó.chân phải.đá()`

    const ast = parser.parse(code, Expression)

    const result = generate(ast)

    expect(result.code).toBe(`con_chó.chân_phải.đá()`)
  })

  it('should generate computed member call', () => {
    const code = `con chó[chân].đá()`

    const ast = parser.parse(code, Expression)

    const result = generate(ast)

    expect(result.code).toBe(`con_chó[chân].đá()`)
  })
})
