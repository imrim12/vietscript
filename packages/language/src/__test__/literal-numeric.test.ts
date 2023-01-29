import { NumericLiteral } from "@lang/nodes/literals/NumericLiteral";

import parser from "./setup-test";
import toPlainObject from "./toPlainObject";

describe("literal-numeric.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse("0", NumericLiteral);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 0,
      raw: "0",
      start: 0,
      end: 1,
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("3.", NumericLiteral);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 3,
      raw: "3.",
      start: 0,
      end: 2,
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("0.1", NumericLiteral);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 0.1,
      raw: "0.1",
      start: 0,
      end: 3,
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("0.001123", NumericLiteral);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 0.001_123,
      raw: "0.001123",
      start: 0,
      end: 8,
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("70e3", NumericLiteral);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 70e3,
      raw: "70e3",
      start: 0,
      end: 4,
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("70E3", NumericLiteral);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 70e3,
      raw: "70E3",
      start: 0,
      end: 4,
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("70E+3", NumericLiteral);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 70e3,
      raw: "70E+3",
      start: 0,
      end: 5,
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("70e-3", NumericLiteral);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 70e-3,
      raw: "70e-3",
      start: 0,
      end: 5,
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("70E-3", NumericLiteral);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 70e-3,
      raw: "70E-3",
      start: 0,
      end: 5,
    });
  });

  it("should show the syntax error", () => {
    expect(() => {
      parser.parse("hehe", NumericLiteral);
    }).toThrowError(/Unexpected token: "hehe"/);
  });
});
