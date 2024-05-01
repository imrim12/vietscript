import generate from "@babel/generator";

import parser from "../../../../setup-test";
import { Expression } from "../../Expression";

describe("generator-expression-object.test", () => {
  it("should parse the syntax normally", () => {
    const code = `
		{
      tiếng kêu: "Meo meo",
			số chân: 4,
			bất đồng bộ kêu(số lần, hmm) {
				trả về "Meo meo"
			}
		}
		`;
    const ast = parser.parse(code, Expression);

    const result = generate(ast);

    expect(result.code).toBe(`{
  _ti7871ng_k234u: "Meo meo",
  _s7889_ch226n: 4,
  async _k234u(_s7889_l7847n, _hmm) {
    return "Meo meo";
  }
}`);
  });
});
