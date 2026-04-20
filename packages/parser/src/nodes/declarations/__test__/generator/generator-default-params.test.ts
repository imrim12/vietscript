import generate from "@babel/generator";

import { FunctionDeclaration } from "@parser/nodes/declarations/FunctionDeclaration";
import { Expression } from "@parser/nodes/expressions/Expression";

import parser from "../../../../setup-test";

describe("generator-default-params.test", () => {
  it("should generate default param in function", () => {
    const ast = parser.parse(`hàm f(a = 1) {}`, FunctionDeclaration);
    const result = generate(ast);
    expect(result.code).toMatchSnapshot();
  });

  it("should generate mixed params", () => {
    const ast = parser.parse(`hàm f(a, b = 2, c) {}`, FunctionDeclaration);
    const result = generate(ast);
    expect(result.code).toMatchSnapshot();
  });

  it("should generate default param in arrow", () => {
    const ast = parser.parse(`(a = 1) => a`, Expression);
    const result = generate(ast);
    expect(result.code).toMatchSnapshot();
  });
});
