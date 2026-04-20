import { Expression } from '@parser/nodes/expressions/Expression'

import parser from '../../../setup-test'
import toPlainObject from '../../../toPlainObject'

describe('literal-template.test', () => {
  it('should parse plain template without interpolation', () => {
    const result = parser.parse('`Xin chào!`', Expression)

    expect(toPlainObject(result)).toMatchObject({
      type: 'TemplateLiteral',
      quasis: [
        {
          type: 'TemplateElement',
          value: { raw: 'Xin chào!', cooked: 'Xin chào!' },
          tail: true,
        },
      ],
      expressions: [],
    })
  })

  it('should parse single interpolation', () => {
    const result = parser.parse('`Xin chào ${ten}!`', Expression)

    expect(toPlainObject(result)).toMatchObject({
      type: 'TemplateLiteral',
      quasis: [
        { type: 'TemplateElement', value: { raw: 'Xin chào ', cooked: 'Xin chào ' }, tail: false },
        { type: 'TemplateElement', value: { raw: '!', cooked: '!' }, tail: true },
      ],
      expressions: [{ type: 'Identifier', name: 'ten' }],
    })
  })

  it('should parse multiple interpolations', () => {
    const result = parser.parse('`${a}-${b}-${c}`', Expression)

    expect(toPlainObject(result)).toMatchObject({
      type: 'TemplateLiteral',
      expressions: [
        { type: 'Identifier', name: 'a' },
        { type: 'Identifier', name: 'b' },
        { type: 'Identifier', name: 'c' },
      ],
    })
    expect((result as any).quasis).toHaveLength(4)
  })

  it('should handle escape sequences in cooked', () => {
    const result = parser.parse('`a\\nb`', Expression)

    expect(toPlainObject(result)).toMatchObject({
      quasis: [
        {
          value: { raw: 'a\\nb', cooked: 'a\nb' },
        },
      ],
    })
  })
})
