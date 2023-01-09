import { NumericLiteral } from "@lang/nodes/literals/NumericLiteral";

import parser from "./setup-test";

describe("literal-numeric.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse("0", NumericLiteral);

    expect(result.node).toStrictEqual({
      type: "NumericLiteral",
      value: 0,
      raw: "0",
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("3.", NumericLiteral);

    expect(result.node).toStrictEqual({
      type: "NumericLiteral",
      value: 3,
      raw: "3",
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("0.1", NumericLiteral);

    expect(result.node).toStrictEqual({
      type: "NumericLiteral",
      value: 0.1,
      raw: "0.1",
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("0.001123", NumericLiteral);

    expect(result.node).toStrictEqual({
      type: "NumericLiteral",
      value: 0.001_123,
      raw: "0.001123",
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("70e3", NumericLiteral);

    expect(result.node).toStrictEqual({
      type: "NumericLiteral",
      value: 70e3,
      raw: "70000",
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("70E3", NumericLiteral);

    expect(result.node).toStrictEqual({
      type: "NumericLiteral",
      value: 70e3,
      raw: "70000",
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("70E+3", NumericLiteral);

    expect(result.node).toStrictEqual({
      type: "NumericLiteral",
      value: 70e3,
      raw: "70000",
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("70e-3", NumericLiteral);

    expect(result.node).toStrictEqual({
      type: "NumericLiteral",
      value: 70e-3,
      raw: "0.07",
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("70E-3", NumericLiteral);

    expect(result.node).toStrictEqual({
      type: "NumericLiteral",
      value: 70e-3,
      raw: "0.07",
    });
  });

  it("should show the syntax error", () => {
    expect(() => {
      parser.parse("hehe", NumericLiteral);
    }).toThrowError(/Unexpected token: "hehe"/);
  });
});
