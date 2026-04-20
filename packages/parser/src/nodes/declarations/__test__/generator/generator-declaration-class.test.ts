import generate from '@babel/generator'

import parser from '../../../../setup-test'
import { Declaration } from '../../Declaration'

describe('generator-declaration-class.test', () => {
  it('should parse the syntax normally', () => {
    const code = `
		lớp Con Mèo (Động Vật) {
			số chân = 4
			bất đồng bộ kêu(số lần, hmm) {
				trả về "Meo meo"
			}
		}
		`

    const ast = parser.parse(code, Declaration)

    const result = generate(ast)

    expect(result.code).toBe(`class Con_Mèo extends Động_Vật {
  số_chân = 4;
  async kêu(số_lần, hmm) {
    return "Meo meo";
  }
}`)
  })
})
