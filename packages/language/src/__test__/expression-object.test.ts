import { ObjectExpression } from "@lang/nodes/expressions/ObjectExpression";

import parser from "./setup-test";
import toPlainObject from "./toPlainObject";

describe("expression-object.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(
      `
		{
			số chân: 4,
			bất đồng bộ kêu(số lần, hmm) {
				trả về "Meo meo"
			}
		}
		`,
      ObjectExpression,
    );

    expect(toPlainObject(result)).toStrictEqual({
      type: "ObjectExpression",
      body: [
        {
          type: "PropertyDefinition",
          static: false,
          computed: false,
          key: {
            type: "Identifier",
            name: "số chân",
          },
          value: {
            type: "Literal",
            value: 4,
            raw: "4",
          },
        },
        {
          type: "MethodDefinition",
          static: false,
          computed: false,
          key: {
            type: "Identifier",
            name: "kêu",
          },
          kind: "method",
          value: {
            type: "FunctionExpression",
            id: null,
            expression: false,
            generator: false,
            async: true,
            params: [
              {
                type: "Identifier",
                name: "số lần",
              },
              {
                type: "Identifier",
                name: "hmm",
              },
            ],
            body: {
              type: "BlockStatement",
              body: [
                {
                  type: "ReturnStatement",
                  argument: {
                    type: "Literal",
                    value: "Meo meo",
                    raw: '"Meo meo"',
                  },
                },
              ],
            },
          },
        },
      ],
    });
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`{}`, ObjectExpression);

    expect(toPlainObject(result)).toStrictEqual({
      type: "ObjectExpression",
      body: [],
    });
  });
});
