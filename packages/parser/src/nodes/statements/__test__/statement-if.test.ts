import { IfStatement } from "@parser/nodes/statements/IfStatement";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("statement-if.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(
      `
			nếu (điều kiện một) {
				khai báo gì đó;
			} không thì nếu (điều kiện hai) {
				khai báo gì đó khác;
			} không thì {
				khai báo gì đó khác nữa; // =))
			}
		`,
      IfStatement,
    );

    expect(toPlainObject(result)).toStrictEqual({
      type: "IfStatement",
      test: {
        type: "Identifier",
        name: "_273i_7873u_ki_7879n_hai",
      },
      consequent: {
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
                  name: "g_236__273_243",
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
      alternate: {
        type: "IfStatement",
        test: {
          type: "Identifier",
          name: "_273i_7873u_ki_7879n_hai",
        },
        consequent: {
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
                    name: "g_236__273_243_kh_225c",
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
        alternate: {
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
                    name: "g_236__273_243_kh_225c_n_7919a",
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
      },
    });
  });
});
