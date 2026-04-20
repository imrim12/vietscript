import { Expression } from '@parser/nodes/expressions/Expression'
import { Literal } from '@parser/nodes/literals/Literal'

import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('literal-regex.test', () => {
  it('should parse simple regex', () => {
    const result = parser.parse(`/abc/`, Literal)
    expect(toPlainObject(result)).toMatchObject({
      type: 'RegExpLiteral',
      pattern: 'abc',
      flags: '',
    })
  })

  it('should parse regex with flags', () => {
    const result = parser.parse(`/abc/gi`, Literal)
    expect(toPlainObject(result)).toMatchObject({
      type: 'RegExpLiteral',
      pattern: 'abc',
      flags: 'gi',
    })
  })

  it('should parse regex with escapes', () => {
    const result = parser.parse(`/a\\/b/`, Literal)
    expect(toPlainObject(result)).toMatchObject({
      type: 'RegExpLiteral',
      pattern: 'a\\/b',
    })
  })

  it('should parse regex with character class containing slash', () => {
    const result = parser.parse(`/[/]/`, Literal)
    expect(toPlainObject(result)).toMatchObject({
      type: 'RegExpLiteral',
      pattern: '[/]',
    })
  })

  it('should treat division as division, not regex, in expression context', () => {
    const result = parser.parse(`a / b`, Expression)
    expect(toPlainObject(result)).toMatchObject({
      type: 'BinaryExpression',
      operator: '/',
    })
  })
})
