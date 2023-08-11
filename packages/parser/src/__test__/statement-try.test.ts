import { TryStatement } from "@parser/nodes/statements/try/TryStatement";

import parser from "./setup-test";
import toPlainObject from "./toPlainObject";

describe("statement-try.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(
      `
			thử {
				khai báo gì đó;
			} bắt lỗi (lỗi) {
				khai báo gì đó khác;
			} cuối cùng {
				khai báo gì đó khác nữa;
			};
		`,
      TryStatement,
    );

    expect(toPlainObject(result)).toStrictEqual({
      type: "TryStatement",
      block: {
        type: "BlockStatement",
        body: [
          {
            type: "VariableDeclaration",
            declarations: [
              {
                type: "VariableDeclarator",
                id: {
                  type: "Identifier",
                  name: "gì đó",
                },
                init: {
                  type: "Literal",
                  raw: "undefined",
                },
              },
            ],
            kind: "var",
          },
        ],
      },
      handler: {
        type: "CatchClause",
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "VariableDeclaration",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: {
                    type: "Identifier",
                    name: "gì đó khác",
                  },
                  init: {
                    type: "Literal",
                    raw: "undefined",
                  },
                },
              ],
              kind: "var",
            },
          ],
        },
        param: {
          type: "Identifier",
          name: "lỗi",
        },
      },
      finalizer: {
        type: "BlockStatement",
        body: [
          {
            type: "VariableDeclaration",
            declarations: [
              {
                type: "VariableDeclarator",
                id: {
                  type: "Identifier",
                  name: "gì đó khác nữa",
                },
                init: {
                  type: "Literal",
                  raw: "undefined",
                },
              },
            ],
            kind: "var",
          },
        ],
      },
    });
  });
});
