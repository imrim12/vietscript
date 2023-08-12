import { ClassDeclaration } from "@parser/nodes/declarations/ClassDeclaration";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";
import { Declaration } from "../Declaration";

describe("declaration-class.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(
      `
		lớp Con Mèo (Động Vật) {
			số chân = 4
			bất đồng bộ kêu(số lần, hmm) {
				trả về "Meo meo"
			}
		}
		`,
      Declaration,
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
            type: "ClassProperty",
            static: false,
            computed: false,
            key: {
              type: "Identifier",
              name: "số chân",
            },
            value: {
              type: "NumericLiteral",
              value: 4,
              extra: {
                rawValue: 4,
                raw: "4",
              },
              start: 41,
              end: 42,
            },
          },
          {
            type: "ClassMethod",
            static: false,
            computed: false,
            key: {
              type: "Identifier",
              name: "kêu",
            },
            value: {
              type: "FunctionExpression",
              id: null,
              expression: false,
              generator: false,
              async: false,
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
                      type: "StringLiteral",
                      value: "Meo meo",
                      extra: {
                        rawValue: "Meo meo",
                        raw: '"Meo meo"',
                      },
                      start: 88,
                      end: 97,
                    },
                  },
                ],
              },
            },
            async: true,
            kind: "method",
          },
        ],
      },
    } as ClassDeclaration);
  });
});
