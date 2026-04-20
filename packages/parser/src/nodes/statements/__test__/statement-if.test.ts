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
        name: "điều_kiện_một",
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
                  name: "gì_đó",
                },
                init: null,
              },
            ],
            kind: "var",
          },
        ],
        directives: [],
      },
      alternate: {
        type: "IfStatement",
        test: {
          type: "Identifier",
          name: "điều_kiện_hai",
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
                    name: "gì_đó_khác",
                  },
                  init: null,
                },
              ],
              kind: "var",
            },
          ],
          directives: [],
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
                    name: "gì_đó_khác_nữa",
                  },
                  init: null,
                },
              ],
              kind: "var",
            },
          ],
          directives: [],
        },
      },
    });
  });
});
