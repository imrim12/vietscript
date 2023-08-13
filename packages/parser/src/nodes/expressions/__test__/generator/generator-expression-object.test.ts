import { ObjectExpression } from "@parser/nodes/expressions/ObjectExpression";
import generate from "@babel/generator";

import parser from "../../../../setup-test";

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
    const ast = parser.parse(code, ObjectExpression);

    const result = generate(ast);

    expect(result.code).toMatchSnapshot();
  });
});
