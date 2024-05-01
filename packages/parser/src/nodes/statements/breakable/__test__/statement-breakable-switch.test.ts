import { SwitchStatement } from "@parser/nodes/statements/breakable/SwitchStatement";

import parser from "../../../../setup-test";
import toPlainObject from "../../../../toPlainObject";

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
        name: "_tu7893i_t225c",
      },
      cases: [
        {
          type: "SwitchCase",
          test: {
            type: "NumericLiteral",
            value: 1,
            extra: {
              rawValue: 1,
              raw: "1",
            },
            start: 38,
            end: 39,
          },
          consequent: [
            {
              type: "VariableDeclaration",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: {
                    type: "Identifier",
                    name: "_xyz",
                  },
                  init: {
                    type: "NumericLiteral",
                    value: 1,
                    extra: {
                      rawValue: 1,
                      raw: "1",
                    },
                    start: 56,
                    end: 57,
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
            type: "NumericLiteral",
            value: 18,
            extra: {
              rawValue: 18,
              raw: "18",
            },
            start: 74,
            end: 76,
          },
          consequent: [],
        },
        {
          type: "SwitchCase",
          test: {
            type: "NumericLiteral",
            value: 60,
            extra: {
              rawValue: 60,
              raw: "60",
            },
            start: 93,
            end: 95,
          },
          consequent: [],
        },
      ],
    });
  });
});
