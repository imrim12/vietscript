import generate from "@babel/generator";

import { Expression } from "@parser/nodes/expressions/Expression";

import parser from "../../../../setup-test";

describe("generator-optional-chain.test", () => {
  it("should generate optional member", () => {
    const ast = parser.parse(`a?.b`, Expression);
    expect(generate(ast).code).toMatchSnapshot();
  });

  it("should generate optional computed", () => {
    const ast = parser.parse(`a?.[k]`, Expression);
    expect(generate(ast).code).toMatchSnapshot();
  });

  it("should generate chained optional", () => {
    const ast = parser.parse(`a?.b?.c`, Expression);
    expect(generate(ast).code).toMatchSnapshot();
  });
});
