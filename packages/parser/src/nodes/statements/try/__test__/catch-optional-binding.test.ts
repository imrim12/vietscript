import { TryStatement } from '@parser/nodes/statements/try/TryStatement'

import parser from '../../../../setup-test'
import toPlainObject from '../../../../toPlainObject'

describe('catch-optional-binding.test', () => {
  it('should parse try-catch with no binding', () => {
    const result = parser.parse(`thử {} bắt lỗi {}`, TryStatement)
    expect(toPlainObject(result)).toMatchObject({
      type: 'TryStatement',
      handler: { type: 'CatchClause', param: null },
    })
  })

  it('should parse try-catch with binding', () => {
    const result = parser.parse(`thử {} bắt lỗi (e) {}`, TryStatement)
    expect(toPlainObject(result)).toMatchObject({
      type: 'TryStatement',
      handler: {
        type: 'CatchClause',
        param: { type: 'Identifier', name: 'e' },
      },
    })
  })
})
