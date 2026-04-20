import { FunctionDeclaration } from "@parser/nodes/declarations/FunctionDeclaration";
import { Expression } from "@parser/nodes/expressions/Expression";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("declaration-default-params.test", () => {
  it("should parse default param in function declaration", () => {
    const result = parser.parse(`hàm f(a = 1) {}`, FunctionDeclaration);

    expect(toPlainObject(result)).toMatchObject({
      type: "FunctionDeclaration",
      params: [
        {
          type: "AssignmentPattern",
          left: { type: "Identifier", name: "a" },
          right: { type: "NumericLiteral", value: 1 },
        },
      ],
    });
  });

  it("should parse mixed normal and default params", () => {
    const result = parser.parse(`hàm f(a, b = 2, c) {}`, FunctionDeclaration);

    expect(toPlainObject(result)).toMatchObject({
      type: "FunctionDeclaration",
      params: [
        { type: "Identifier", name: "a" },
        {
          type: "AssignmentPattern",
          left: { type: "Identifier", name: "b" },
          right: { type: "NumericLiteral", value: 2 },
        },
        { type: "Identifier", name: "c" },
      ],
    });
  });

  it("should parse default param in arrow function", () => {
    const result = parser.parse(`(a = 1) => a`, Expression);

    expect(toPlainObject(result)).toMatchObject({
      type: "ArrowFunctionExpression",
      params: [
        {
          type: "AssignmentPattern",
          left: { type: "Identifier", name: "a" },
          right: { type: "NumericLiteral", value: 1 },
        },
      ],
    });
  });

  it("should parse string default", () => {
    const result = parser.parse(`hàm f(name = "Tú") {}`, FunctionDeclaration);

    expect(toPlainObject(result)).toMatchObject({
      params: [
        {
          type: "AssignmentPattern",
          left: { type: "Identifier" },
          right: { type: "StringLiteral", value: "Tú" },
        },
      ],
    });
  });
});
