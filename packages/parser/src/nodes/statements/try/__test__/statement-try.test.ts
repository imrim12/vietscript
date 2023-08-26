import { TryStatement } from "@parser/nodes/statements/try/TryStatement";

import parser from "../../../../setup-test";
import toPlainObject from "../../../../toPlainObject";

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
        directives: [],
        body: [
          {
            type: "VariableDeclaration",
            declarations: [
              {
                type: "VariableDeclarator",
                id: {
                  type: "Identifier",
                  name: "g236_273243",
                },
                init: {
                  type: "Identifier",
                  name: "undefined",
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
          directives: [],
          body: [
            {
              type: "VariableDeclaration",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: {
                    type: "Identifier",
                    name: "g236_273243_kh225c",
                  },
                  init: {
                    type: "Identifier",
                    name: "undefined",
                  },
                },
              ],
              kind: "var",
            },
          ],
        },
        param: {
          type: "Identifier",
          name: "l7895i",
        },
      },
      finalizer: {
        type: "BlockStatement",
        directives: [],
        body: [
          {
            type: "VariableDeclaration",
            declarations: [
              {
                type: "VariableDeclarator",
                id: {
                  type: "Identifier",
                  name: "g236_273243_kh225c_n7919a",
                },
                init: {
                  type: "Identifier",
                  name: "undefined",
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
