import { Program } from "@parser/nodes/Program";

import parser from "./setup-test";
import toPlainObject from "./toPlainObject";

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
                type: "Literal",
                value: 25,
                raw: "25",
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
                type: "Literal",
                value: "Tú Nguyễn",
                raw: '"Tú Nguyễn"',
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
                      type: "Literal",
                      raw: "undefined",
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
                        type: "Literal",
                        raw: "undefined",
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
                        type: "Literal",
                        raw: "undefined",
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
                      type: "Literal",
                      raw: "undefined",
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
                        type: "Literal",
                        raw: "undefined",
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
                      type: "Literal",
                      raw: "undefined",
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
                      type: "Literal",
                      value: "cắn",
                      raw: '"cắn"',
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
