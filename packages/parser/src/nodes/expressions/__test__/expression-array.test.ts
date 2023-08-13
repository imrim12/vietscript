import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";
import { ArrayExpression } from "../ArrayExpression";

describe("expression-array.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(`[1, "a", đúng, sai, "đúng", "true", NaN]`, ArrayExpression);

    expect(toPlainObject(result)).toStrictEqual({
      type: "ArrayExpression",
      elements: [
        {
          type: "NumericLiteral",
          value: 1,
          extra: {
            rawValue: 1,
            raw: "1",
          },
          start: 1,
          end: 2,
        },
        {
          type: "StringLiteral",
          value: "a",
          extra: {
            rawValue: "a",
            raw: '"a"',
          },
          start: 4,
          end: 7,
        },
        {
          type: "BooleanLiteral",
          value: true,
          start: 9,
          end: 13,
        },
        {
          type: "BooleanLiteral",
          value: false,
          start: 15,
          end: 18,
        },
        {
          type: "StringLiteral",
          value: "đúng",
          extra: {
            rawValue: "đúng",
            raw: '"đúng"',
          },
          start: 20,
          end: 26,
        },
        {
          type: "StringLiteral",
          value: "true",
          extra: {
            rawValue: "true",
            raw: '"true"',
          },
          start: 28,
          end: 34,
        },
        {
          type: "Identifier",
          name: "NaN",
          start: 36,
          end: 39,
        },
      ],
    } as ArrayExpression);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`[]`, ArrayExpression);

    expect(toPlainObject(result)).toStrictEqual({
      type: "ArrayExpression",
      elements: [],
    } as ArrayExpression);
  });
});
