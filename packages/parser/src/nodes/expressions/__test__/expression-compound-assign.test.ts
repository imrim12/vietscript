import { Expression } from '@parser/nodes/expressions/Expression'

import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('expression-compound-assign.test', () => {
  const cases: Array<[string, string]> = [
    ['+=', 'a += 1'],
    ['-=', 'a -= 1'],
    ['*=', 'a *= 2'],
    ['/=', 'a /= 2'],
    ['%=', 'a %= 2'],
    ['**=', 'a **= 2'],
    ['&=', 'a &= 1'],
    ['|=', 'a |= 1'],
    ['^=', 'a ^= 1'],
    ['<<=', 'a <<= 1'],
    ['>>=', 'a >>= 1'],
    ['>>>=', 'a >>>= 1'],
    ['||=', 'a ||= 1'],
    ['&&=', 'a &&= 1'],
    ['??=', 'a ??= 1'],
  ]

  for (const [op, code] of cases) {
    it(`should parse ${op}`, () => {
      const result = parser.parse(code, Expression)
      expect(toPlainObject(result)).toMatchObject({
        type: 'AssignmentExpression',
        operator: op,
      })
    })
  }
})
