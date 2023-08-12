import { Program } from "@parser/nodes/Program";

import parser from "../setup-test";
import toPlainObject from "../toPlainObject";

describe("program.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(
      `khai báo tuổi = 25;;;
		khai báo tên = "Tú Nguyễn";;
		lớp Con Mèo (Động Vật) {
			số chân
			bất đồng bộ kêu(số lần, hmm) {
				trả về "Meo meo"
			}
		}
		
		duyệt (tuổi tác) {
			trường hợp 1:
				var xyz = 1;
			trường hợp 18:
			trường hợp 60:
		}
		
		nếu (điều kiện một) {
			khai báo gì đó;
		} không thì nếu (điều kiện hai) {
			khai báo gì đó khác;
		} không thì {
			khai báo gì đó khác nữa; // =))
		}
		
		thử {
			khai báo gì đó;
		} bắt lỗi (lỗi) {
			khai báo gì đó khác;
		} cuối cùng {
			khai báo gì đó khác nữa;
		};
		
    hàm ngẫu nhiên() {
      khai báo hành động = "cắn";
      con chó.mồm.sủa()
      con chó.mồm[hành động]()
    }
`,
      Program,
    );

    expect(toPlainObject(result)).toStrictEqual({
      type: "Program",
      body: [
        {
          type: "VariableDeclaration",
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: "tuổi",
              },
              init: {
                type: "NumericLiteral",
                value: 25,
                extra: {
                  rawValue: 25,
                  raw: "25",
                },
                start: 16,
                end: 18,
              },
            },
          ],
          kind: "var",
        },
        {
          type: "EmptyStatement",
        },
        {
          type: "EmptyStatement",
        },
        {
          type: "VariableDeclaration",
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: "tên",
              },
              init: {
                type: "StringLiteral",
                value: "Tú Nguyễn",
                extra: {
                  rawValue: "Tú Nguyễn",
                  raw: '"Tú Nguyễn"',
                },
                start: 39,
                end: 50,
              },
            },
          ],
          kind: "var",
        },
        {
          type: "EmptyStatement",
        },
        {
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
                value: null,
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
                          start: 136,
                          end: 145,
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
        },
        {
          type: "SwitchStatement",
          discriminant: {
            type: "Identifier",
            name: "tuổi tác",
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
                start: 193,
                end: 194,
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
                        type: "NumericLiteral",
                        value: 1,
                        extra: {
                          rawValue: 1,
                          raw: "1",
                        },
                        start: 210,
                        end: 211,
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
                start: 227,
                end: 229,
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
                start: 245,
                end: 247,
              },
              consequent: [],
            },
          ],
        },
        {
          type: "IfStatement",
          test: {
            type: "Identifier",
            name: "điều kiện một",
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
                      name: "gì đó",
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
              name: "điều kiện hai",
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
                        name: "gì đó khác",
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
                        name: "gì đó khác nữa",
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
        },
        {
          type: "TryStatement",
          block: {
            type: "BlockStatement",
            body: [
              {
                type: "VariableDeclaration",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: {
                      type: "Identifier",
                      name: "gì đó",
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
              body: [
                {
                  type: "VariableDeclaration",
                  declarations: [
                    {
                      type: "VariableDeclarator",
                      id: {
                        type: "Identifier",
                        name: "gì đó khác",
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
              name: "lỗi",
            },
          },
          finalizer: {
            type: "BlockStatement",
            body: [
              {
                type: "VariableDeclaration",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: {
                      type: "Identifier",
                      name: "gì đó khác nữa",
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
        {
          type: "FunctionDeclaration",
          id: {
            type: "Identifier",
            name: "ngẫu nhiên",
          },
          expression: false,
          generator: false,
          async: false,
          params: [],
          body: {
            type: "BlockStatement",
            body: [
              {
                type: "VariableDeclaration",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: {
                      type: "Identifier",
                      name: "hành động",
                    },
                    init: {
                      type: "StringLiteral",
                      value: "cắn",
                      extra: {
                        rawValue: "cắn",
                        raw: '"cắn"',
                      },
                      start: 590,
                      end: 595,
                    },
                  },
                ],
                kind: "var",
              },
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "MemberExpression",
                    object: {
                      type: "MemberExpression",
                      object: {
                        type: "Identifier",
                        name: "con chó",
                      },
                      property: {
                        type: "Identifier",
                        name: "mồm",
                      },
                      computed: false,
                      optional: false,
                    },
                    property: {
                      type: "Identifier",
                      name: "sủa",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [],
                  optional: false,
                },
              },
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "MemberExpression",
                    object: {
                      type: "MemberExpression",
                      object: {
                        type: "Identifier",
                        name: "con chó",
                      },
                      property: {
                        type: "Identifier",
                        name: "mồm",
                      },
                      computed: false,
                      optional: false,
                    },
                    property: {
                      type: "Identifier",
                      name: "hành động",
                    },
                    computed: true,
                    optional: false,
                  },
                  arguments: [],
                  optional: false,
                },
              },
            ],
          },
        },
      ],
    });
  });
});
