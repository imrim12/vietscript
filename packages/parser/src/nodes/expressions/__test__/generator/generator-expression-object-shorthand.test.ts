import generate from "@babel/generator";

import { Expression } from "@parser/nodes/expressions/Expression";

import parser from "../../../../setup-test";

describe("generator-expression-object-shorthand.test", () => {
  it("should generate shorthand property", () => {
    const ast = parser.parse(`{ a, b }`, Expression);
    expect(generate(ast).code).toMatchSnapshot();
  });

  it("should generate mixed shorthand and regular", () => {
    const ast = parser.parse(`{ a, b: 2, c }`, Expression);
    expect(generate(ast).code).toMatchSnapshot();
  });

  it("should generate computed property", () => {
    const ast = parser.parse(`{ [key]: 1 }`, Expression);
    expect(generate(ast).code).toMatchSnapshot();
  });
});
