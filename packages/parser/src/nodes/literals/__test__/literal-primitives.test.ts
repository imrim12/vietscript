import { Expression } from '@parser/nodes/expressions/Expression'
import { Literal } from '@parser/nodes/literals/Literal'

import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('literal-primitives.test', () => {
  it('should parse NaN', () => {
    const result = parser.parse(`NaN`, Literal)
    expect(toPlainObject(result)).toMatchObject({
      type: 'Identifier',
      name: 'NaN',
    })
  })

  it('should parse Infinity', () => {
    const result = parser.parse(`Infinity`, Expression)
    expect(toPlainObject(result)).toMatchObject({ type: 'Identifier', name: 'Infinity' })
  })

  it('should parse Vietnamese vô cực as Infinity identifier', () => {
    const result = parser.parse(`vô cực`, Expression)
    expect(toPlainObject(result)).toMatchObject({ type: 'Identifier' })
  })

  it('should parse null with English keyword', () => {
    const result = parser.parse(`null`, Literal)
    expect(toPlainObject(result)).toMatchObject({ type: 'NullLiteral' })
  })

  it('should parse null with Vietnamese rỗng', () => {
    const result = parser.parse(`rỗng`, Literal)
    expect(toPlainObject(result)).toMatchObject({ type: 'NullLiteral' })
  })

  it('should parse undefined', () => {
    const result = parser.parse(`undefined`, Literal)
    expect(toPlainObject(result)).toMatchObject({ type: 'Identifier', name: 'undefined' })
  })

  it('should parse không xác định', () => {
    const result = parser.parse(`không xác định`, Literal)
    expect(toPlainObject(result)).toMatchObject({ type: 'Identifier' })
  })

  it('should parse scientific notation', () => {
    const result = parser.parse(`1.5e2`, Literal)
    expect(toPlainObject(result)).toMatchObject({
      type: 'NumericLiteral',
      value: 150,
    })
  })

  it('should parse booleans', () => {
    const t = parser.parse(`true`, Literal)
    const f = parser.parse(`false`, Literal)
    expect(toPlainObject(t)).toMatchObject({ type: 'BooleanLiteral', value: true })
    expect(toPlainObject(f)).toMatchObject({ type: 'BooleanLiteral', value: false })
  })

  it('should parse Vietnamese đúng and sai', () => {
    const t = parser.parse(`đúng`, Literal)
    const f = parser.parse(`sai`, Literal)
    expect(toPlainObject(t)).toMatchObject({ type: 'BooleanLiteral', value: true })
    expect(toPlainObject(f)).toMatchObject({ type: 'BooleanLiteral', value: false })
  })
})
