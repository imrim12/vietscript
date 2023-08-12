import { StringLiteral } from "@parser/nodes/literals/StringLiteral";
import { Literal } from "@parser/nodes/literals/Literal";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("literal-string.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(`"Chào thế giới!"`, Literal);

    expect(toPlainObject(result)).toStrictEqual({
      type: "StringLiteral",
      value: "Chào thế giới!",
      extra: {
        rawValue: "Chào thế giới!",
        raw: '"Chào thế giới!"',
      },
      start: 0,
      end: 16,
    } as StringLiteral);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`'Chào thế giới!'`, Literal);

    expect(toPlainObject(result)).toStrictEqual({
      type: "StringLiteral",
      value: "Chào thế giới!",
      extra: {
        rawValue: "Chào thế giới!",
        raw: '"Chào thế giới!"',
      },
      start: 0,
      end: 16,
    } as StringLiteral);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("`Chào thế giới!`", Literal);

    expect(toPlainObject(result)).toStrictEqual({
      type: "StringLiteral",
      value: "Chào thế giới!",
      extra: {
        rawValue: "Chào thế giới!",
        raw: '"Chào thế giới!"',
      },
      start: 0,
      end: 16,
    } as StringLiteral);
  });
});
