import type { Parser } from '@parser/parser'
import type { Node } from '@vietscript/shared'
import { Keyword } from '@vietscript/shared'

function cook(raw: string): string {
  return raw.replace(/\\(x[0-9a-fA-F]{2}|u\{[0-9a-fA-F]+\}|u[0-9a-fA-F]{4}|.)/g, (_, seq) => {
    if (seq[0] === 'x') {
      return String.fromCharCode(Number.parseInt(seq.slice(1), 16))
    }
    if (seq[0] === 'u') {
      const body = seq[1] === '{' ? seq.slice(2, -1) : seq.slice(1)
      return String.fromCodePoint(Number.parseInt(body, 16))
    }
    switch (seq) {
      case 'n':
        return '\n'
      case 'r':
        return '\r'
      case 't':
        return '\t'
      case 'b':
        return '\b'
      case 'f':
        return '\f'
      case 'v':
        return '\v'
      case '0':
        return '\0'
      case '\\':
        return '\\'
      case '\'':
        return '\''
      case '"':
        return '"'
      default:
        return seq
    }
  })
}

export class StringLiteral implements Node {
  type = 'StringLiteral'

  value: string

  extra: {
    rawValue: string
    raw: string
  }

  start: number

  end: number

  constructor(parser: Parser) {
    const token = parser.eat(Keyword.STRING)

    this.start = token.start
    this.end = token.end

    const raw = String(token.value)
    const inner = raw.slice(1, -1)
    const value = cook(inner)

    this.value = value

    this.extra = {
      rawValue: value,
      raw: JSON.stringify(value),
    }
  }
}
