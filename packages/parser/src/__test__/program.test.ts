import { Program } from "@parser/nodes/Program";
import toPlainObject from "../toPlainObject";
import parser from "@parser";

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
                start: 41,
                end: 52,
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
            name: "Con_Mèo",
          },
          superClass: {
            type: "Identifier",
            name: "Động_Vật",
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
                  name: "số_chân",
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
                kind: "method",
                id: null,
                generator: false,
                async: true,
                params: [
                  {
                    type: "Identifier",
                    name: "số_lần",
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
                        start: 146,
                        end: 155,
                      },
                    },
                  ],
                  directives: [],
                },
              },
            ],
          },
        },
        {
          type: "SwitchStatement",
          discriminant: {
            type: "Identifier",
            name: "tuổi_tác",
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
                start: 209,
                end: 210,
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
                        start: 228,
                        end: 229,
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
                start: 247,
                end: 249,
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
                start: 267,
                end: 269,
              },
              consequent: [],
            },
          ],
        },
        {
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
        {
          type: "FunctionDeclaration",
          id: {
            type: "Identifier",
            name: "ngẫu_nhiên",
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
                      name: "hành_động",
                    },
                    init: {
                      type: "StringLiteral",
                      value: "cắn",
                      extra: {
                        rawValue: "cắn",
                        raw: '"cắn"',
                      },
                      start: 640,
                      end: 645,
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
                        name: "con_chó",
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
                        name: "con_chó",
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
                      name: "hành_động",
                    },
                    computed: true,
                    optional: false,
                  },
                  arguments: [],
                  optional: false,
                },
              },
            ],
            directives: [],
          },
        },
      ],
    });
  });

  it("should parse program with multiple const declarations correctly", () => {
    const result = parser.parse(
      `hằng số tuổi = 25;hằng số địa chỉ = "Đà Nẵng";
      hằng số tên = "Tú Nguyễn";
  	}`,
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
                start: 15,
                end: 17,
              },
            },
          ],
          kind: "const",
        },
        {
          type: "VariableDeclaration",
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: "địa_chỉ",
              },
              init: {
                type: "StringLiteral",
                value: "Đà Nẵng",
                extra: {
                  rawValue: "Đà Nẵng",
                  raw: '"Đà Nẵng"',
                },
                start: 36,
                end: 45,
              },
            },
          ],
          kind: "const",
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
                start: 67,
                end: 78,
              },
            },
          ],
          kind: "const",
        },
      ],
    });
  });
});
