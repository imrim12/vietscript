import { createTokenizer, Parser } from '@parser/parser'

import { Expression } from '../expressions/Expression'

interface TemplateElement {
  type: 'TemplateElement'
  value: { raw: string, cooked: string }
  tail: boolean
}

function cook(raw: string): string {
  return raw.replace(/\\(.)/g, (_, ch) => {
    switch (ch) {
      case 'n':
        return '\n'
      case 'r':
        return '\r'
      case 't':
        return '\t'
      case '\\':
        return '\\'
      case '`':
        return '`'
      case '$':
        return '$'
      default:
        return ch
    }
  })
}

function splitTemplate(inner: string): { quasis: string[], expressions: string[] } {
  const quasis: string[] = []
  const expressions: string[] = []
  let current = ''
  let i = 0

  while (i < inner.length) {
    if (inner[i] === '\\' && i + 1 < inner.length) {
      current += inner[i] + inner[i + 1]
      i += 2
      continue
    }

    if (inner[i] === '$' && inner[i + 1] === '{') {
      quasis.push(current)
      current = ''
      i += 2

      let depth = 1
      let expr = ''
      while (i < inner.length && depth > 0) {
        const ch = inner[i]
        if (ch === '\\') {
          expr += ch + inner[i + 1]
          i += 2
          continue
        }
        if (ch === '"' || ch === '\'') {
          const quote = ch
          expr += ch
          i++
          while (i < inner.length && inner[i] !== quote) {
            if (inner[i] === '\\') {
              expr += inner[i] + inner[i + 1]
              i += 2
              continue
            }
            expr += inner[i]
            i++
          }
          expr += inner[i]
          i++
          continue
        }
        if (ch === '{') {
          depth++
        }
        else if (ch === '}') {
          depth--
          if (depth === 0) {
            i++
            break
          }
        }
        expr += ch
        i++
      }
      expressions.push(expr)
      continue
    }

    current += inner[i]
    i++
  }

  quasis.push(current)
  return { quasis, expressions }
}

export class TemplateLiteral {
  type = 'TemplateLiteral'

  quasis: Array<TemplateElement> = []

  expressions: Array<Expression> = []

  constructor(parser: Parser) {
    const token = parser.eat('TemplateLiteral')
    const raw = String(token?.value)
    const inner = raw.slice(1, -1)

    const { quasis, expressions } = splitTemplate(inner)

    for (let idx = 0; idx < quasis.length; idx++) {
      const rawText = quasis[idx]
      this.quasis.push({
        type: 'TemplateElement',
        value: { raw: rawText, cooked: cook(rawText) },
        tail: idx === quasis.length - 1,
      })
    }

    for (const exprSource of expressions) {
      const subParser = new Parser({ tokenizer: parser.tokenizerKind })
      subParser.syntax = exprSource
      subParser.tokenizer = createTokenizer(subParser)
      subParser.lookahead = subParser.tokenizer.getNextToken()
      this.expressions.push(new Expression(subParser))
    }
  }
}
