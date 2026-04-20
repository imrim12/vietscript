import { FunctionDeclaration } from "@parser/nodes/declarations/FunctionDeclaration";
import { Expression } from "@parser/nodes/expressions/Expression";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("declaration-rest-params.test", () => {
  it("should parse rest param alone", () => {
    const result = parser.parse(`hàm f(...args) {}`, FunctionDeclaration);

    expect(toPlainObject(result)).toMatchObject({
      type: "FunctionDeclaration",
      params: [
        {
          type: "RestElement",
          argument: { type: "Identifier", name: "args" },
        },
      ],
    });
  });

  it("should parse rest param after normal params", () => {
    const result = parser.parse(`hàm f(a, b, ...rest) {}`, FunctionDeclaration);

    expect(toPlainObject(result)).toMatchObject({
      params: [
        { type: "Identifier", name: "a" },
        { type: "Identifier", name: "b" },
        {
          type: "RestElement",
          argument: { type: "Identifier", name: "rest" },
        },
      ],
    });
  });

  it("should parse rest param in arrow", () => {
    const result = parser.parse(`(...args) => args`, Expression);

    expect(toPlainObject(result)).toMatchObject({
      type: "ArrowFunctionExpression",
      params: [
        {
          type: "RestElement",
          argument: { type: "Identifier", name: "args" },
        },
      ],
    });
  });

  it("should throw when rest param is not last", () => {
    expect(() => {
      parser.parse(`hàm f(...a, b) {}`, FunctionDeclaration);
    }).toThrowError(/Rest parameter/);
  });
});
