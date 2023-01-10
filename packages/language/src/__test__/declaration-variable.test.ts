import { VariableDeclaration } from "@lang/nodes/declarations/VariableDeclaration";

import parser from "./setup-test";
import toPlainObject from "./toPlainObject";

describe("declaration-variable.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(`var a = 1`, VariableDeclaration);

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
            type: "Literal",
            value: 1,
            raw: "1",
          },
        },
      ],
      kind: "var",
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`var a = 1, b`, VariableDeclaration);

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
            type: "Literal",
            value: 1,
            raw: "1",
          },
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "b",
          },
          init: {
            type: "Literal",

            raw: "undefined",
          },
        },
      ],
      kind: "var",
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`let a = 1`, VariableDeclaration);

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
            type: "Literal",
            value: 1,
            raw: "1",
          },
        },
      ],
      kind: "let",
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`let a = 1, b`, VariableDeclaration);

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
            type: "Literal",
            value: 1,
            raw: "1",
          },
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "b",
          },
          init: {
            type: "Literal",

            raw: "undefined",
          },
        },
      ],
      kind: "let",
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`const a = 1`, VariableDeclaration);

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
            type: "Literal",
            value: 1,
            raw: "1",
          },
        },
      ],
      kind: "const",
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`khai báo số một = 1`, VariableDeclaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "số một",
          },
          init: {
            type: "Literal",
            value: 1,
            raw: "1",
          },
        },
      ],
      kind: "var",
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`khai báo a = 1, b`, VariableDeclaration);

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
            type: "Literal",
            value: 1,
            raw: "1",
          },
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "b",
          },
          init: {
            type: "Literal",

            raw: "undefined",
          },
        },
      ],
      kind: "var",
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`hằng số họ và tên = "Nguyễn"`, VariableDeclaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "họ và tên",
          },
          init: {
            type: "Literal",
            value: "Nguyễn",
            raw: '"Nguyễn"',
          },
        },
      ],
      kind: "const",
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`khai báo tuổi = không xác định, tên = "Nhi"`, VariableDeclaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "tuổi",
          },
          init: {
            type: "Literal",

            raw: "undefined",
          },
        },
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "tên",
          },
          init: {
            type: "Literal",
            value: "Nhi",
            raw: '"Nhi"',
          },
        },
      ],
      kind: "var",
    });
  });

  it("should parse the syntax normally", () => {
    expect(() => {
      parser.parse("const a", VariableDeclaration);
    }).toThrowError(/Unexpected end of input, expected: "="/);
  });

  it("should show the syntax error", () => {
    expect(() => {
      parser.parse("123", VariableDeclaration);
    }).toThrowError(/Unexpected token: "123"/);
  });
});
