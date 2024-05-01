import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";
import { Declaration } from "../Declaration";
import { ExportDeclaration } from "../export/ExportDeclaration";

describe("declaration-export.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(`cho phép * từ "./test-path"`, Declaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "ExportAllDeclaration",
      source: {
        type: "StringLiteral",
        value: "./test-path",
        extra: {
          rawValue: "./test-path",
          raw: '"./test-path"',
        },
        start: 14,
        end: 27,
      },
    } as ExportDeclaration);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`cho phép { tính năng gì đấy } từ "./test-path"`, Declaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "ExportNamedDeclaration",
      specifiers: [
        {
          type: "ExportSpecifier",
          local: {
            type: "Identifier",
            name: "_t237nh_n259ng_g236_2737845y",
          },
          exported: {
            type: "Identifier",
            name: "_t237nh_n259ng_g236_2737845y",
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
        start: 33,
        end: 46,
      },
    } as ExportDeclaration);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(
      `cho phép {
        tính năng cộng: phương thức cộng,
        tính năng chia: phương thức chia,
        phương thức trừ
      } từ "./test-path"`,
      Declaration,
    );

    expect(toPlainObject(result)).toStrictEqual({
      type: "ExportNamedDeclaration",
      specifiers: [
        {
          type: "ExportSpecifier",
          local: {
            type: "Identifier",
            name: "_t237nh_n259ng_c7897ng",
          },
          exported: {
            type: "Identifier",
            name: "_ph432417ng_th7913c_c7897ng",
          },
        },
        {
          type: "ExportSpecifier",
          local: {
            type: "Identifier",
            name: "_t237nh_n259ng_chia",
          },
          exported: {
            type: "Identifier",
            name: "_ph432417ng_th7913c_chia",
          },
        },
        {
          type: "ExportSpecifier",
          local: {
            type: "Identifier",
            name: "_ph432417ng_th7913c_tr7915",
          },
          exported: {
            type: "Identifier",
            name: "_ph432417ng_th7913c_tr7915",
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
        start: 130,
        end: 143,
      },
    } as ExportDeclaration);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`cho phép mặc định con mèo`, Declaration);

    expect(toPlainObject(result)).toStrictEqual({
      type: "ExportDefaultDeclaration",
      declaration: {
        type: "Identifier",
        name: "_con_m232o",
      },
    } as ExportDeclaration);
  });
});
