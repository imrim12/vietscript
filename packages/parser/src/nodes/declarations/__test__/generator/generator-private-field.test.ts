import generate from "@babel/generator";

import { ClassDeclaration } from "@parser/nodes/declarations/ClassDeclaration";

import parser from "../../../../setup-test";

describe("generator-private-field.test", () => {
  it("should generate private field", () => {
    const ast = parser.parse(`lớp Cat { #tuổi = 3 }`, ClassDeclaration);
    expect(generate(ast).code).toMatchSnapshot();
  });

  it("should generate private field without init", () => {
    const ast = parser.parse(`lớp Cat { #tuổi }`, ClassDeclaration);
    expect(generate(ast).code).toMatchSnapshot();
  });
});
