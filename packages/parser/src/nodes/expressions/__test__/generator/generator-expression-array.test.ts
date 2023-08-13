import generate from "@babel/generator";
import { ArrayExpression } from "@parser/nodes/expressions/ArrayExpression";

import parser from "../../../../setup-test";

describe("generator-expression-array.test", () => {
  it("should parse the syntax normally", () => {
    const code = `[1, "a", đúng, sai, "đúng", "true", NaN]`;

    const ast = parser.parse(code, ArrayExpression);

    const result = generate(ast);

    expect(result.code).toMatchSnapshot();
  });
});
