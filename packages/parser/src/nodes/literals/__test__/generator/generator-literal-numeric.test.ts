import { Literal } from "@parser/nodes/literals/Literal";
import generate from "@babel/generator";

import parser from "../../../../setup-test";

describe("generator-literal-numeric.test", () => {
  it("should parse the syntax normally", () => {
    const code = "0";

    const ast = parser.parse(code, Literal);

    const result = generate(ast);

    expect(result.code).toMatchSnapshot();
  });

  it("should parse the syntax normally", () => {
    const code = "0.001123";

    const ast = parser.parse(code, Literal);

    const result = generate(ast);

    expect(result.code).toMatchSnapshot();
  });

  it("should parse the syntax normally", () => {
    const code = "70E-3";

    const ast = parser.parse(code, Literal);

    const result = generate(ast);

    expect(result.code).toMatchSnapshot();
  });
});
