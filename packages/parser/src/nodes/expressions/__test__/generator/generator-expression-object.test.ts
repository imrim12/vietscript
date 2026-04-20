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
  tiếng_kêu: "Meo meo",
  số_chân: 4,
  async kêu(số_lần, hmm) {
    return "Meo meo";
  }
}`);
  });
});
