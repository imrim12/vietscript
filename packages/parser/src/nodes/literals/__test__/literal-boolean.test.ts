import { BooleanLiteral } from "@parser/nodes/literals/BooleanLiteral";
import { Literal } from "@parser/nodes/literals/Literal";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("literal-boolean.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse("đúng", Literal);

    expect(toPlainObject(result)).toStrictEqual({
      type: "BooleanLiteral",
      value: true,
      start: 0,
      end: 4,
    } as BooleanLiteral);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("sai", Literal);

    expect(toPlainObject(result)).toStrictEqual({
      type: "BooleanLiteral",
      value: false,
      start: 0,
      end: 3,
    } as BooleanLiteral);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("true", Literal);

    expect(toPlainObject(result)).toStrictEqual({
      type: "BooleanLiteral",
      value: true,
      start: 0,
      end: 4,
    } as BooleanLiteral);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("false", Literal);

    expect(toPlainObject(result)).toStrictEqual({
      type: "BooleanLiteral",
      value: false,
      start: 0,
      end: 5,
    } as BooleanLiteral);
  });
});
