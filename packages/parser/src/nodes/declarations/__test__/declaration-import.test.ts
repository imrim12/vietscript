import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";
import { Declaration } from "../Declaration";
import { ImportDeclaration } from "../import/ImportDeclaration";

describe("declaration-import.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(`sử dụng "./test-path"`, Declaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "ImportDeclaration",
      specifiers: [],
      source: {
        type: "StringLiteral",
        value: "./test-path",
        extra: {
          rawValue: "./test-path",
          raw: '"./test-path"',
        },
        start: 8,
        end: 21,
      },
      assertions: [],
    } as ImportDeclaration);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`sử dụng * như là abc từ "./test-path"`, Declaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "ImportDeclaration",
      specifiers: [
        {
          type: "ImportNamespaceSpecifier",
          local: {
            type: "Identifier",
            name: "abc",
          },
        },
      ],
      source: {
        type: "StringLiteral",
        value: "./test-path",
        extra: {
          rawValue: "./test-path",
          raw: '"./test-path"',
        },
        start: 24,
        end: 37,
      },
      assertions: [],
    } as ImportDeclaration);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`sử dụng cái gì đó từ "./test-path"`, Declaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "ImportDeclaration",
      specifiers: [
        {
          type: "ImportDefaultSpecifier",
          local: {
            type: "Identifier",
            name: "_c225i_g236_273243",
          },
        },
      ],
      source: {
        type: "StringLiteral",
        value: "./test-path",
        extra: {
          rawValue: "./test-path",
          raw: '"./test-path"',
        },
        start: 20,
        end: 33,
      },
      assertions: [],
    } as ImportDeclaration);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`sử dụng cái gì đó, { con cún : con chó con } từ "./test-path"`, Declaration);
    expect(toPlainObject(result)).toStrictEqual({
      type: "ImportDeclaration",
      specifiers: [
        {
          local: {
            type: "Identifier",
            name: "_c225i_g236_273243",
          },
        },
        {
          type: "ImportSpecifier",
          imported: {
            type: "Identifier",
            name: "_con_c250n",
          },
          local: {
            type: "Identifier",
            name: "_con_ch243_con",
          },
        },
      ],
      source: {
        type: "StringLiteral",
        value: "./test-path",
        extra: {
          rawValue: "./test-path",
          raw: '"./test-path"',
        },
        start: 48,
        end: 61,
      },
      assertions: [],
      importType: "value",
    } as ImportDeclaration);
  });
});
