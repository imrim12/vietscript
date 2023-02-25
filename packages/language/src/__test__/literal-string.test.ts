import { StringLiteral } from "@lang/nodes/literals/StringLiteral";

import parser from "./setup-test";
import toPlainObject from "./toPlainObject";

describe("literal-string.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(`"Hello world!"`, StringLiteral);

    expect(toPlainObject(result)).toStrictEqual({
      type: "StringLiteral",
      value: "Hello world!",
      raw: '"Hello world!"',
      start: 0,
      end: 14,
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`'Hello world!'`, StringLiteral);

    expect(toPlainObject(result)).toStrictEqual({
      type: "StringLiteral",
      value: "Hello world!",
      raw: '"Hello world!"',
      start: 0,
      end: 14,
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("`Hello world!`", StringLiteral);

    expect(toPlainObject(result)).toStrictEqual({
      type: "StringLiteral",
      value: "Hello world!",
      raw: '"Hello world!"',
      start: 0,
      end: 14,
    });
  });

  it("should show the syntax error", () => {
    expect(() => {
      parser.parse("123", StringLiteral);
    }).toThrowError(/Unexpected token: "123"/);
  });
});
