import { BooleanLiteral } from "@lang/nodes/literals/BooleanLiteral";

import parser from "./setup-test";
import toPlainObject from "./toPlainObject";

describe("literal-boolean.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse("true", BooleanLiteral);

    expect(toPlainObject(result)).toStrictEqual({
      type: "BooleanLiteral",
      value: true,
      raw: "true",
      start: 0,
      end: 4,
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("false", BooleanLiteral);

    expect(toPlainObject(result)).toStrictEqual({
      type: "BooleanLiteral",
      value: false,
      raw: "false",
      start: 0,
      end: 5,
    });
  });

  it("should show the syntax error", () => {
    expect(() => {
      parser.parse("hehe", BooleanLiteral);
    }).toThrowError(/Unexpected token: "hehe"/);
  });
});
