import { NumericLiteral } from "@parser/nodes/literals/NumericLiteral";
import { Literal } from "@parser/nodes/literals/Literal";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("literal-numeric.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse("0", Literal);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 0,
      extra: {
        rawValue: 0,
        raw: "0",
      },
      start: 0,
      end: 1,
    } as NumericLiteral);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("3.", Literal);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 3,
      extra: {
        rawValue: 3,
        raw: "3.",
      },
      start: 0,
      end: 2,
    } as NumericLiteral);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("0.1", Literal);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 0.1,
      extra: {
        rawValue: 0.1,
        raw: "0.1",
      },
      start: 0,
      end: 3,
    } as NumericLiteral);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("0.001123", Literal);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 0.001_123,
      extra: {
        rawValue: 0.001_123,
        raw: "0.001123",
      },
      start: 0,
      end: 8,
    } as NumericLiteral);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("70e3", Literal);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 70e3,
      extra: {
        rawValue: 70e3,
        raw: "70e3",
      },
      start: 0,
      end: 4,
    } as NumericLiteral);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("70E3", Literal);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 70e3,
      extra: {
        rawValue: 70e3,
        raw: "70E3",
      },
      start: 0,
      end: 4,
    } as NumericLiteral);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("70E+3", Literal);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 70e3,
      extra: {
        rawValue: 70e3,
        raw: "70E+3",
      },
      start: 0,
      end: 5,
    } as NumericLiteral);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("70e-3", Literal);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 70e-3,
      extra: {
        rawValue: 70e-3,
        raw: "70e-3",
      },
      start: 0,
      end: 5,
    } as NumericLiteral);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("70E-3", Literal);

    expect(toPlainObject(result)).toStrictEqual({
      type: "NumericLiteral",
      value: 70e-3,
      extra: {
        rawValue: 70e-3,
        raw: "70E-3",
      },
      start: 0,
      end: 5,
    } as NumericLiteral);
  });
});
