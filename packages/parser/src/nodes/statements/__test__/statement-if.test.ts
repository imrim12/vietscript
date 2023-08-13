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
        name: "273i7873u_ki7879n_m7897t",
      },
      consequent: {
        type: "BlockStatement",
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
      alternate: {
        type: "IfStatement",
        test: {
          type: "Identifier",
          name: "273i7873u_ki7879n_hai",
        },
        consequent: {
          type: "BlockStatement",
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
        alternate: {
          type: "BlockStatement",
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
      },
    });
  });
});
