import { TryStatement } from '@parser/nodes/statements/try/TryStatement'

import parser from '../../../../setup-test'
import toPlainObject from '../../../../toPlainObject'

describe('statement-try.test', () => {
  it('should parse the syntax normally', () => {
    const result = parser.parse(
      `
			thử {
				khai báo gì đó;
			} bắt lỗi (lỗi) {
				khai báo gì đó khác;
			} cuối cùng {
				khai báo gì đó khác nữa;
			};
		`,
      TryStatement,
    )

    expect(toPlainObject(result)).toStrictEqual({
      type: 'TryStatement',
      block: {
        type: 'BlockStatement',
        directives: [],
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'gì_đó',
                },
                init: null,
              },
            ],
            kind: 'var',
          },
        ],
      },
      handler: {
        type: 'CatchClause',
        body: {
          type: 'BlockStatement',
          directives: [],
          body: [
            {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'gì_đó_khác',
                  },
                  init: null,
                },
              ],
              kind: 'var',
            },
          ],
        },
        param: {
          type: 'Identifier',
          name: 'lỗi',
        },
      },
      finalizer: {
        type: 'BlockStatement',
        directives: [],
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'gì_đó_khác_nữa',
                },
                init: null,
              },
            ],
            kind: 'var',
          },
        ],
      },
    })
  })
})
