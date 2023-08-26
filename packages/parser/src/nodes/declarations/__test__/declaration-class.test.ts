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
        name: "Con_M232o",
      },
      superClass: {
        type: "Identifier",
        name: "2727897ng_V7853t",
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
              name: "s7889_ch226n",
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
              name: "k234u",
            },
            kind: "method",
            id: null,
            generator: false,
            async: true,
            params: [
              {
                type: "Identifier",
                name: "s7889_l7847n",
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
              directives: [],
            },
          },
        ],
      },
    } as ClassDeclaration);
  });
});
