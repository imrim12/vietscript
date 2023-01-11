import { SwitchStatement } from "@lang/nodes/statements/breakable/SwitchStatement";

import parser from "./setup-test";
import toPlainObject from "./toPlainObject";

describe("statement-breakable-switch.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(
      `
			duyệt (tuổi tác) {
				trường hợp 1:
					var xyz = 1;
				trường hợp 18:
				trường hợp 60:
			}
		`,
      SwitchStatement,
    );

    expect(toPlainObject(result)).toStrictEqual({
      type: "SwitchStatement",
      discriminant: {
        type: "Identifier",
        name: "tuổi tác",
      },
      cases: [
        {
          type: "SwitchCase",
          test: {
            type: "Literal",
            value: 1,
            raw: "1",
          },
          consequent: [
            {
              type: "VariableDeclaration",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: {
                    type: "Identifier",
                    name: "xyz",
                  },
                  init: {
                    type: "Literal",
                    value: 1,
                    raw: "1",
                  },
                },
              ],
              kind: "var",
            },
          ],
        },
        {
          type: "SwitchCase",
          test: {
            type: "Literal",
            value: 18,
            raw: "18",
          },
          consequent: [],
        },
        {
          type: "SwitchCase",
          test: {
            type: "Literal",
            value: 60,
            raw: "60",
          },
          consequent: [],
        },
      ],
    });
  });
});
