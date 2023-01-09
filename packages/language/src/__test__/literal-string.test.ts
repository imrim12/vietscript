import { StringLiteral } from "@lang/nodes/literals/StringLiteral";

import parser from "./setup-test";

describe("literal-string.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(`"Hello world!"`, StringLiteral);

    expect(result.node).toStrictEqual({
      type: "StringLiteral",
      value: "Hello world!",
      raw: '"Hello world!"',
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`'Hello world!'`, StringLiteral);

    expect(result.node).toStrictEqual({
      type: "StringLiteral",
      value: "Hello world!",
      raw: '"Hello world!"',
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("`Hello world!`", StringLiteral);

    expect(result.node).toStrictEqual({
      type: "StringLiteral",
      value: "Hello world!",
      raw: '"Hello world!"',
    });
  });

  it("should show the syntax error", () => {
    expect(() => {
      parser.parse("123", StringLiteral);
    }).toThrowError(/Unexpected token: "123"/);
  });
});
