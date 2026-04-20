import generate from "@babel/generator";

import { ClassDeclaration } from "@parser/nodes/declarations/ClassDeclaration";
import { Expression } from "@parser/nodes/expressions/Expression";

import parser from "../../../../setup-test";

describe("generator-getter-setter.test", () => {
  it("should generate getter in class", () => {
    const ast = parser.parse(`lớp Cat { lấy tuổi() { trả về 3 } }`, ClassDeclaration);
    expect(generate(ast).code).toMatchSnapshot();
  });

  it("should generate setter in class", () => {
    const ast = parser.parse(`lớp Cat { gán tuổi(v) {} }`, ClassDeclaration);
    expect(generate(ast).code).toMatchSnapshot();
  });

  it("should generate getter in object literal", () => {
    const ast = parser.parse(`{ lấy tuổi() { trả về 3 } }`, Expression);
    expect(generate(ast).code).toMatchSnapshot();
  });
});
