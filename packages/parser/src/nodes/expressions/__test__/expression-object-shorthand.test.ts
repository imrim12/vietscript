import { Expression } from "@parser/nodes/expressions/Expression";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("expression-object-shorthand.test", () => {
  it("should parse shorthand property", () => {
    const result = parser.parse(`{ a, b }`, Expression);

    expect(toPlainObject(result)).toMatchObject({
      type: "ObjectExpression",
      properties: [
        {
          type: "ObjectProperty",
          shorthand: true,
          key: { type: "Identifier", name: "a" },
          value: { type: "Identifier", name: "a" },
        },
        {
          type: "ObjectProperty",
          shorthand: true,
          key: { type: "Identifier", name: "b" },
          value: { type: "Identifier", name: "b" },
        },
      ],
    });
  });

  it("should parse regular property as non-shorthand", () => {
    const result = parser.parse(`{ a: 1 }`, Expression);

    expect(toPlainObject(result)).toMatchObject({
      properties: [
        {
          type: "ObjectProperty",
          shorthand: false,
          key: { type: "Identifier", name: "a" },
          value: { type: "NumericLiteral", value: 1 },
        },
      ],
    });
  });

  it("should parse computed property", () => {
    const result = parser.parse(`{ [key]: 1 }`, Expression);

    expect(toPlainObject(result)).toMatchObject({
      properties: [
        {
          type: "ObjectProperty",
          computed: true,
          key: { type: "Identifier", name: "key" },
          value: { type: "NumericLiteral", value: 1 },
        },
      ],
    });
  });

  it("should parse mixed shorthand and regular", () => {
    const result = parser.parse(`{ a, b: 2, c }`, Expression);

    expect(toPlainObject(result)).toMatchObject({
      properties: [
        { type: "ObjectProperty", shorthand: true },
        { type: "ObjectProperty", shorthand: false },
        { type: "ObjectProperty", shorthand: true },
      ],
    });
  });
});
