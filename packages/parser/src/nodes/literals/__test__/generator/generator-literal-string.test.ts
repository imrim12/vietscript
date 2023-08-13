import { Literal } from "@parser/nodes/literals/Literal";
import generate from "@babel/generator";

import parser from "../../../../setup-test";

describe("generator-literal-string.test", () => {
  it("should generate the javascript from the syntax normally", () => {
    const code = `"Chào thế giới!"`;
    const ast = parser.parse(code, Literal);

    const result = generate(ast);

    expect(result.code).toMatchSnapshot();
  });
});
