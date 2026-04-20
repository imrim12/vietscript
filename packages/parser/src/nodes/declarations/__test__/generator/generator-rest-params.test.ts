import generate from "@babel/generator";

import { FunctionDeclaration } from "@parser/nodes/declarations/FunctionDeclaration";
import { Expression } from "@parser/nodes/expressions/Expression";

import parser from "../../../../setup-test";

describe("generator-rest-params.test", () => {
  it("should generate rest param", () => {
    const ast = parser.parse(`hàm f(...args) {}`, FunctionDeclaration);
    const result = generate(ast);
    expect(result.code).toMatchSnapshot();
  });

  it("should generate rest after normal", () => {
    const ast = parser.parse(`hàm f(a, b, ...rest) {}`, FunctionDeclaration);
    const result = generate(ast);
    expect(result.code).toMatchSnapshot();
  });

  it("should generate rest in arrow", () => {
    const ast = parser.parse(`(...args) => args`, Expression);
    const result = generate(ast);
    expect(result.code).toMatchSnapshot();
  });
});
