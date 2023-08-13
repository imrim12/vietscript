import { VariableDeclaration } from "@parser/nodes/declarations/VariableDeclaration";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";
import { Declaration } from "../Declaration";

describe("declaration-variable.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(`var a = 1`, Declaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "a",
          },
          init: {
            type: "NumericLiteral",
            value: 1,
            extra: {
              rawValue: 1,
              raw: "1",
            },
            start: 8,
            end: 9,
          },
        },
      ],
      kind: "var",
    } as VariableDeclaration);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`var a = 1, b`, Declaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "a",
          },
          init: {
            type: "NumericLiteral",
            value: 1,
            extra: {
              rawValue: 1,
              raw: "1",
            },
            start: 8,
            end: 9,
          },
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "b",
          },
          init: {
            type: "Identifier",
            name: "undefined",
          },
        },
      ],
      kind: "var",
    } as VariableDeclaration);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`let a = 1`, Declaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "a",
          },
          init: {
            type: "NumericLiteral",
            value: 1,
            extra: {
              rawValue: 1,
              raw: "1",
            },
            start: 8,
            end: 9,
          },
        },
      ],
      kind: "let",
    } as VariableDeclaration);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`let a = 1, b`, Declaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "a",
          },
          init: {
            type: "NumericLiteral",
            value: 1,
            extra: {
              rawValue: 1,
              raw: "1",
            },
            start: 8,
            end: 9,
          },
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "b",
          },
          init: {
            type: "Identifier",
            name: "undefined",
          },
        },
      ],
      kind: "let",
    } as VariableDeclaration);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`const a = 1`, Declaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "a",
          },
          init: {
            type: "NumericLiteral",
            value: 1,
            extra: {
              rawValue: 1,
              raw: "1",
            },
            start: 10,
            end: 11,
          },
        },
      ],
      kind: "const",
    } as VariableDeclaration);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`khai báo số một = 1`, Declaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "s7889_m7897t",
          },
          init: {
            type: "NumericLiteral",
            value: 1,
            extra: {
              rawValue: 1,
              raw: "1",
            },
            start: 18,
            end: 19,
          },
        },
      ],
      kind: "var",
    } as VariableDeclaration);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`khai báo a = 1, b`, Declaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "a",
          },
          init: {
            type: "NumericLiteral",
            value: 1,
            extra: {
              rawValue: 1,
              raw: "1",
            },
            start: 13,
            end: 14,
          },
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "b",
          },
          init: {
            type: "Identifier",
            name: "undefined",
          },
        },
      ],
      kind: "var",
    } as VariableDeclaration);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`hằng số họ và tên = "Nguyễn"`, Declaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "h7885_v224_t234n",
          },
          init: {
            type: "StringLiteral",
            value: "Nguyễn",
            extra: {
              rawValue: "Nguyễn",
              raw: '"Nguyễn"',
            },
            start: 20,
            end: 28,
          },
        },
      ],
      kind: "const",
    } as VariableDeclaration);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`khai báo tuổi = không xác định, tên = "Nhi"`, Declaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "tu7893i",
          },
          init: {
            type: "Identifier",
            name: "Undefined",
            start: 16,
            end: 30,
          },
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "t234n",
          },
          init: {
            type: "StringLiteral",
            value: "Nhi",
            extra: {
              rawValue: "Nhi",
              raw: '"Nhi"',
            },
            start: 38,
            end: 43,
          },
        },
      ],
      kind: "var",
    } as VariableDeclaration);
  });
});
