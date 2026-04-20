import { Literal } from "@parser/nodes/literals/Literal";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("literal-string-escape.test", () => {
  const cases: Array<[string, string]> = [
    ['"a\\nb"', "a\nb"],
    ['"a\\tb"', "a\tb"],
    ['"a\\rb"', "a\rb"],
    ['"a\\\\b"', "a\\b"],
    ['"a\\"b"', 'a"b'],
    ["'a\\'b'", "a'b"],
    ['"\\x41"', "A"],
    ['"\\u0041"', "A"],
    ['"\\u{1F600}"', "😀"],
    ['"\\0"', "\0"],
  ];

  for (const [input, expected] of cases) {
    it(`should parse ${input} as ${JSON.stringify(expected)}`, () => {
      const result = parser.parse(input, Literal);
      expect(toPlainObject(result)).toMatchObject({
        type: "StringLiteral",
        value: expected,
      });
    });
  }
});
