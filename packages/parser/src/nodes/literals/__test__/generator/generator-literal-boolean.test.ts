import { Literal } from "@parser/nodes/literals/Literal";
import generate from "@babel/generator";

import parser from "../../../../setup-test";

describe("generator-literal-boolean.test", () => {
  it("should parse the syntax normally", () => {
    const code = "đúng";

    const ast = parser.parse(code, Literal);

    const result = generate(ast);

    expect(result.code).toMatchSnapshot();
  });

  it("should parse the syntax normally", () => {
    const code = "sai";

    const ast = parser.parse(code, Literal);

    const result = generate(ast);

    expect(result.code).toMatchSnapshot();
  });
});
