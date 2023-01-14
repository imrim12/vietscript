import { ClassDeclaration } from "@lang/nodes/declarations/ClassDeclaration";

import parser from "./setup-test";
import toPlainObject from "./toPlainObject";

describe("declaration-class.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(
      `
		lớp Con Mèo (Động Vật) {
			số chân
			bất đồng bộ kêu(số lần, hmm) {
				return "Meo meo"
			}
		}
		`,
      ClassDeclaration,
    );

    expect(toPlainObject(result)).toStrictEqual({
      type: "ClassDeclaration",
      id: {
        type: "Identifier",
        name: "Con Mèo",
      },
      superClass: {
        type: "Identifier",
        name: "Động Vật",
      },
      body: {
        type: "ClassBody",
        body: [
          {
            type: "PropertyDefinition",
            static: false,
            computed: false,
            key: {
              type: "Identifier",
              name: "số chân",
            },
            value: null,
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
      },
    });
  });
});
