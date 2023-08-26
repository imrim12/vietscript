import generate from "@babel/generator";

import parser from "../../../../setup-test";
import { Declaration } from "../../Declaration";

describe("generator-declaration-class.test", () => {
  it("should parse the syntax normally", () => {
    const code = `
		lớp Con Mèo (Động Vật) {
			số chân = 4
			bất đồng bộ kêu(số lần, hmm) {
				trả về "Meo meo"
			}
		}
		`;

    const ast = parser.parse(code, Declaration);

    const result = generate(ast);

    expect(result.code).toBe(`class Con_M232o extends 2727897ng_V7853t {
  s7889_ch226n = 4;
  async k234u(s7889_l7847n, hmm) {
    return "Meo meo";
  }
}`);
  });
});
