import generate from "@babel/generator";

import parser from "../../../../setup-test";
import { Expression } from "../../Expression";

describe("generator-expression-array.test", () => {
  it("should parse the syntax normally", () => {
    const code = `xin chào === hello`;

    const ast = parser.parse(code, Expression);

    const result = generate(ast);

    expect(result.code).toBe(`xin_ch224o === hello`);
  });
});
