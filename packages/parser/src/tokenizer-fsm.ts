import type { Token } from '@vietscript/shared'
import type { Parser } from './parser'

import { Keyword } from '@vietscript/shared'

// Boundary kinds (post-keyword check):
//   WORD: next char must not be in [A-Za-z0-9_] (mimics JS \b after ASCII word).
//   IDENT: next char must not be in [A-Za-zÀ-ỹ] (mimics negative
//          lookahead used for VI keywords ending in non-ASCII).
//   NONE: no boundary check (mimics keywords without \b such as `else`,
//         `return`, `try`, `as`, `from`, `const`, `async`).
const Boundary = {
  WORD: 0,
  IDENT: 1,
  NONE: 2,
} as const

type BoundaryKind = typeof Boundary[keyof typeof Boundary]

interface KeywordEntry {
  text: string
  type: Keyword
  boundary: BoundaryKind
}

// Mirrors the regex spec table in constants/specs.ts. The FSM walks a trie
// built from these entries to detect keywords; ordering does not matter here
// because the trie picks the longest valid match with a passing boundary.
const KEYWORDS: ReadonlyArray<KeywordEntry> = [
  { text: 'var', type: Keyword.VAR, boundary: Boundary.WORD },
  { text: 'khai báo', type: Keyword.VAR, boundary: Boundary.WORD },
  { text: 'break', type: Keyword.BREAK, boundary: Boundary.WORD },
  { text: 'phá vòng lặp', type: Keyword.BREAK, boundary: Boundary.WORD },
  { text: 'do', type: Keyword.DO, boundary: Boundary.WORD },
  { text: 'thực hiện', type: Keyword.DO, boundary: Boundary.WORD },
  { text: 'instanceof', type: Keyword.INSTANCEOF, boundary: Boundary.WORD },
  { text: 'là kiểu', type: Keyword.INSTANCEOF, boundary: Boundary.WORD },
  { text: 'typeof', type: Keyword.TYPEOF, boundary: Boundary.WORD },
  { text: 'kiểu của', type: Keyword.TYPEOF, boundary: Boundary.WORD },
  { text: 'switch', type: Keyword.SWITCH, boundary: Boundary.WORD },
  { text: 'duyệt', type: Keyword.SWITCH, boundary: Boundary.WORD },
  { text: 'case', type: Keyword.CASE, boundary: Boundary.WORD },
  { text: 'trường hợp', type: Keyword.CASE, boundary: Boundary.WORD },
  { text: 'if', type: Keyword.IF, boundary: Boundary.WORD },
  { text: 'nếu', type: Keyword.IF, boundary: Boundary.WORD },
  { text: 'else', type: Keyword.ELSE, boundary: Boundary.NONE },
  { text: 'không thì', type: Keyword.ELSE, boundary: Boundary.NONE },
  { text: 'new', type: Keyword.NEW, boundary: Boundary.WORD },
  { text: 'catch', type: Keyword.CATCH, boundary: Boundary.WORD },
  { text: 'bắt lỗi', type: Keyword.CATCH, boundary: Boundary.WORD },
  { text: 'finally', type: Keyword.FINALLY, boundary: Boundary.WORD },
  { text: 'cuối cùng', type: Keyword.FINALLY, boundary: Boundary.WORD },
  { text: 'return', type: Keyword.RETURN, boundary: Boundary.NONE },
  { text: 'trả về', type: Keyword.RETURN, boundary: Boundary.NONE },
  { text: 'void', type: Keyword.VOID, boundary: Boundary.WORD },
  { text: 'continue', type: Keyword.CONTINUE, boundary: Boundary.WORD },
  { text: 'tiếp tục', type: Keyword.CONTINUE, boundary: Boundary.WORD },
  { text: 'for', type: Keyword.FOR, boundary: Boundary.WORD },
  { text: 'lặp', type: Keyword.FOR, boundary: Boundary.WORD },
  { text: 'while', type: Keyword.WHILE, boundary: Boundary.WORD },
  { text: 'khi mà', type: Keyword.WHILE, boundary: Boundary.IDENT },
  { text: 'debugger', type: Keyword.DEBUGGER, boundary: Boundary.WORD },
  { text: 'function', type: Keyword.FUNCTION, boundary: Boundary.WORD },
  { text: 'hàm', type: Keyword.FUNCTION, boundary: Boundary.WORD },
  { text: 'this', type: Keyword.THIS, boundary: Boundary.WORD },
  { text: 'đây', type: Keyword.THIS, boundary: Boundary.WORD },
  { text: 'with', type: Keyword.WITH, boundary: Boundary.WORD },
  { text: 'default', type: Keyword.DEFAULT, boundary: Boundary.WORD },
  { text: 'mặc định', type: Keyword.DEFAULT, boundary: Boundary.WORD },
  { text: 'throw', type: Keyword.THROW, boundary: Boundary.WORD },
  { text: 'báo lỗi', type: Keyword.THROW, boundary: Boundary.WORD },
  { text: 'delete', type: Keyword.DELETE, boundary: Boundary.WORD },
  { text: 'xoá', type: Keyword.DELETE, boundary: Boundary.IDENT },
  { text: 'in', type: Keyword.IN, boundary: Boundary.WORD },
  { text: 'trong', type: Keyword.IN, boundary: Boundary.WORD },
  { text: 'of', type: Keyword.OF, boundary: Boundary.WORD },
  { text: 'của', type: Keyword.OF, boundary: Boundary.WORD },
  { text: 'try', type: Keyword.TRY, boundary: Boundary.NONE },
  { text: 'thử', type: Keyword.TRY, boundary: Boundary.NONE },
  { text: 'as', type: Keyword.AS, boundary: Boundary.NONE },
  { text: 'như là', type: Keyword.AS, boundary: Boundary.NONE },
  { text: 'from', type: Keyword.FROM, boundary: Boundary.NONE },
  { text: 'từ', type: Keyword.FROM, boundary: Boundary.NONE },
  { text: 'const', type: Keyword.CONST, boundary: Boundary.NONE },
  { text: 'hằng số', type: Keyword.CONST, boundary: Boundary.NONE },
  { text: 'class', type: Keyword.CLASS, boundary: Boundary.WORD },
  { text: 'lớp', type: Keyword.CLASS, boundary: Boundary.WORD },
  { text: 'super', type: Keyword.SUPER, boundary: Boundary.WORD },
  { text: 'khởi tạo cha', type: Keyword.SUPER, boundary: Boundary.WORD },
  { text: 'constructor', type: Keyword.CONSTRUCTOR, boundary: Boundary.WORD },
  { text: 'khởi tạo', type: Keyword.CONSTRUCTOR, boundary: Boundary.WORD },
  { text: 'extends', type: Keyword.EXTENDS, boundary: Boundary.WORD },
  { text: 'kế thừa', type: Keyword.EXTENDS, boundary: Boundary.WORD },
  { text: 'export', type: Keyword.EXPORT, boundary: Boundary.WORD },
  { text: 'cho phép', type: Keyword.EXPORT, boundary: Boundary.WORD },
  { text: 'import', type: Keyword.IMPORT, boundary: Boundary.WORD },
  { text: 'sử dụng', type: Keyword.IMPORT, boundary: Boundary.WORD },
  { text: 'async', type: Keyword.ASYNC, boundary: Boundary.NONE },
  { text: 'bất đồng bộ', type: Keyword.ASYNC, boundary: Boundary.NONE },
  { text: 'await', type: Keyword.AWAIT, boundary: Boundary.WORD },
  { text: 'chờ', type: Keyword.AWAIT, boundary: Boundary.IDENT },
  { text: 'yield', type: Keyword.YIELD, boundary: Boundary.WORD },
  { text: 'nhường', type: Keyword.YIELD, boundary: Boundary.WORD },
  { text: 'let', type: Keyword.LET, boundary: Boundary.WORD },
  { text: 'biến', type: Keyword.LET, boundary: Boundary.WORD },
  { text: 'private', type: Keyword.PRIVATE, boundary: Boundary.WORD },
  { text: 'riêng tư', type: Keyword.PRIVATE, boundary: Boundary.IDENT },
  { text: 'public', type: Keyword.PUBLIC, boundary: Boundary.WORD },
  { text: 'công khai', type: Keyword.PUBLIC, boundary: Boundary.WORD },
  { text: 'protected', type: Keyword.PROTECTED, boundary: Boundary.WORD },
  { text: 'bảo vệ', type: Keyword.PROTECTED, boundary: Boundary.IDENT },
  { text: 'static', type: Keyword.STATIC, boundary: Boundary.WORD },
  { text: 'tĩnh', type: Keyword.STATIC, boundary: Boundary.WORD },
  { text: 'get', type: Keyword.GET, boundary: Boundary.WORD },
  { text: 'lấy', type: Keyword.GET, boundary: Boundary.WORD },
  { text: 'set', type: Keyword.SET, boundary: Boundary.WORD },
  { text: 'gán', type: Keyword.SET, boundary: Boundary.WORD },
  { text: 'null', type: Keyword.NULL, boundary: Boundary.WORD },
  { text: 'rỗng', type: Keyword.NULL, boundary: Boundary.WORD },
  { text: 'NaN', type: Keyword.NAN, boundary: Boundary.WORD },
  { text: 'Infinity', type: Keyword.INFINITY, boundary: Boundary.WORD },
  { text: 'vô cực', type: Keyword.INFINITY, boundary: Boundary.WORD },
  { text: 'undefined', type: Keyword.UNDEFINED, boundary: Boundary.WORD },
  { text: 'không xác định', type: Keyword.UNDEFINED, boundary: Boundary.WORD },
  { text: 'true', type: Keyword.BOOLEAN, boundary: Boundary.WORD },
  { text: 'false', type: Keyword.BOOLEAN, boundary: Boundary.WORD },
  { text: 'đúng', type: Keyword.BOOLEAN, boundary: Boundary.WORD },
  { text: 'sai', type: Keyword.BOOLEAN, boundary: Boundary.WORD },
]

class TrieNode {
  children = new Map<number, TrieNode>()
  type: Keyword | null = null
  boundary: BoundaryKind = Boundary.WORD
}

const KEYWORD_TRIE: TrieNode = (() => {
  const root = new TrieNode()
  for (const entry of KEYWORDS) {
    let node = root
    for (let i = 0; i < entry.text.length; i++) {
      const code = entry.text.charCodeAt(i)
      let child = node.children.get(code)
      if (!child) {
        child = new TrieNode()
        node.children.set(code, child)
      }
      node = child
    }
    if (node.type === null) {
      node.type = entry.type
      node.boundary = entry.boundary
    }
  }
  return root
})()

// Operator longest-match tree. Built from a flat list of operator strings.
// Order independent — at lookup time we walk character-by-character and keep
// track of the longest valid operator end seen.
const OPERATORS: readonly string[] = [
  '...',
  '.',
  '>>>=',
  '>>>',
  '>>=',
  '>>',
  '<<=',
  '<<',
  '<=',
  '>=',
  '<',
  '>',
  '===',
  '!==',
  '==',
  '!=',
  '=>',
  '**=',
  '**',
  '*=',
  '*',
  '++',
  '+=',
  '+',
  '--',
  '-=',
  '-',
  '/=',
  '/',
  '%=',
  '%',
  '&&=',
  '&&',
  '&=',
  '&',
  '||=',
  '||',
  '|=',
  '|',
  '^=',
  '^',
  '~',
  '!',
  '??=',
  '??',
  '?.',
  '?',
  '=',
  '[',
  ']',
  '(',
  ')',
  '{',
  '}',
  ';',
  ',',
  ':',
  '#',
]

class OperatorNode {
  children = new Map<number, OperatorNode>()
  value: string | null = null
}

const OPERATOR_TRIE: OperatorNode = (() => {
  const root = new OperatorNode()
  for (const op of OPERATORS) {
    let node = root
    for (let i = 0; i < op.length; i++) {
      const code = op.charCodeAt(i)
      let child = node.children.get(code)
      if (!child) {
        child = new OperatorNode()
        node.children.set(code, child)
      }
      node = child
    }
    node.value = op
  }
  return root
})()

const REGEX_PRECEDING_TOKENS = new Set<string>([
  '(',
  '[',
  '{',
  ',',
  ';',
  ':',
  '=',
  '!',
  '?',
  '+',
  '-',
  '*',
  '/',
  '%',
  '&&',
  '||',
  '??',
  '=>',
  '==',
  '===',
  '!=',
  '!==',
  '<',
  '>',
  '<=',
  '>=',
  '&',
  '|',
  '^',
  '~',
  '<<',
  '>>',
  '>>>',
  '+=',
  '-=',
  '*=',
  '/=',
  '%=',
  '**=',
  '&=',
  '|=',
  '^=',
  '<<=',
  '>>=',
  '>>>=',
  '&&=',
  '||=',
  '??=',
  '...',
  Keyword.RETURN,
  Keyword.YIELD,
  Keyword.AWAIT,
  Keyword.TYPEOF,
  Keyword.VOID,
  Keyword.DELETE,
  Keyword.NEW,
  Keyword.THROW,
  Keyword.IN,
  Keyword.OF,
  Keyword.INSTANCEOF,
  Keyword.CASE,
  Keyword.DEFAULT,
])

function isWhitespace(code: number): boolean {
  // Mirrors JS \s minus what we don't expect in source. We rely on String.prototype
  // to be lenient — anything not handled below falls through to the operator
  // dispatcher and throws cleanly.
  return code === 0x20 /* space */
    || code === 0x09 /* tab */
    || code === 0x0A /* LF */
    || code === 0x0D /* CR */
    || code === 0x0B /* VT */
    || code === 0x0C /* FF */
    || code === 0xA0 /* NBSP */
}

function isAsciiLetter(code: number): boolean {
  return (code >= 0x41 && code <= 0x5A) || (code >= 0x61 && code <= 0x7A)
}

function isVietnameseLetter(code: number): boolean {
  return code >= 0x00C0 && code <= 0x1EF9
}

function isIdentStart(code: number): boolean {
  return isAsciiLetter(code) || isVietnameseLetter(code)
}

function isDigit(code: number): boolean {
  return code >= 0x30 && code <= 0x39
}

function isIdentCont(code: number): boolean {
  return isIdentStart(code) || isDigit(code)
}

function isHexDigit(code: number): boolean {
  return isDigit(code)
    || (code >= 0x41 && code <= 0x46)
    || (code >= 0x61 && code <= 0x66)
}

function isOctalDigit(code: number): boolean {
  return code >= 0x30 && code <= 0x37
}

function isBinaryDigit(code: number): boolean {
  return code === 0x30 || code === 0x31
}

function isAsciiWordChar(code: number): boolean {
  return isAsciiLetter(code) || isDigit(code) || code === 0x5F /* _ */
}

export class TokenizerFSM {
  private parser: Parser

  private cursor: number

  private lastTokenType: string | null = null

  constructor(parser: Parser) {
    this.parser = parser
    this.cursor = 0
  }

  public getCursor(): number {
    return this.cursor
  }

  public rollback(step: number): number {
    if (this.parser.lookahead)
      this.parser.lookahead.end -= step
    this.cursor -= step
    return this.cursor
  }

  public isEOF(): boolean {
    return this.cursor === this.parser.syntax.length
  }

  protected hasMoreTokens(): boolean {
    return this.cursor < this.parser.syntax.length
  }

  public getNextToken(): Token | null {
    const source = this.parser.syntax
    const length = source.length

    while (this.cursor < length) {
      const start = this.cursor
      const code = source.charCodeAt(this.cursor)

      if (isWhitespace(code)) {
        this.cursor++
        continue
      }

      // Line comment: //...
      if (code === 0x2F && source.charCodeAt(this.cursor + 1) === 0x2F) {
        this.cursor += 2
        while (this.cursor < length && source.charCodeAt(this.cursor) !== 0x0A) {
          this.cursor++
        }
        continue
      }

      // Block comment: /* ... */
      if (code === 0x2F && source.charCodeAt(this.cursor + 1) === 0x2A) {
        this.cursor += 2
        while (this.cursor < length) {
          if (source.charCodeAt(this.cursor) === 0x2A
            && source.charCodeAt(this.cursor + 1) === 0x2F) {
            this.cursor += 2
            break
          }
          this.cursor++
        }
        continue
      }

      // Template literal
      if (code === 0x60) {
        return this.scanTemplateLiteral(start)
      }

      // Regex literal (context-sensitive)
      if (code === 0x2F && this.isRegexExpected()) {
        const tok = this.scanRegexLiteral(start)
        if (tok !== null) {
          this.lastTokenType = tok.type as string
          return tok
        }
      }

      // String literals
      if (code === 0x22 || code === 0x27) {
        return this.scanString(start, code)
      }

      // Numeric literals: digits, or `.` followed by digit
      if (isDigit(code)) {
        return this.scanNumber(start)
      }
      if (code === 0x2E /* . */ && isDigit(source.charCodeAt(this.cursor + 1))) {
        return this.scanNumber(start)
      }

      // Identifier / keyword
      if (isIdentStart(code)) {
        return this.scanIdentifierOrKeyword(start)
      }

      // Operator (longest match via trie)
      const opTok = this.scanOperator(start)
      if (opTok !== null) {
        return opTok
      }

      throw new SyntaxError(`Unexpected token: "${source[this.cursor]}"`)
    }

    return null
  }

  private isRegexExpected(): boolean {
    if (this.lastTokenType === null)
      return true
    return REGEX_PRECEDING_TOKENS.has(this.lastTokenType)
  }

  private scanString(start: number, quote: number): Token {
    const source = this.parser.syntax
    const length = source.length
    let i = start + 1
    while (i < length) {
      const ch = source.charCodeAt(i)
      if (ch === 0x5C /* \ */) {
        i += 2
        continue
      }
      if (ch === quote) {
        i++
        const value = source.slice(start, i)
        this.cursor = i
        this.lastTokenType = Keyword.STRING
        return {
          type: Keyword.STRING,
          value,
          start,
          end: i,
        }
      }
      i++
    }
    throw new SyntaxError(`Unterminated string literal at ${start}`)
  }

  private scanNumber(start: number): Token {
    const source = this.parser.syntax
    const length = source.length
    let i = start

    // Leading dot decimal: .5, .5e2, .5n (n probably nonsense, but match regex)
    if (source.charCodeAt(i) === 0x2E /* . */) {
      i++
      while (i < length) {
        const c = source.charCodeAt(i)
        if (isDigit(c) || c === 0x5F) {
          i++
          continue
        }
        break
      }
      i = this.consumeExponent(i)
      i = this.consumeBigIntSuffix(i)
      return this.emitNumber(start, i)
    }

    // 0x / 0o / 0b
    if (source.charCodeAt(i) === 0x30) {
      const next = source.charCodeAt(i + 1)
      if (next === 0x78 || next === 0x58) {
        i += 2
        while (i < length) {
          const c = source.charCodeAt(i)
          if (isHexDigit(c) || c === 0x5F) {
            i++
            continue
          }
          break
        }
        i = this.consumeBigIntSuffix(i)
        return this.emitNumber(start, i)
      }
      if (next === 0x6F || next === 0x4F) {
        i += 2
        while (i < length) {
          const c = source.charCodeAt(i)
          if (isOctalDigit(c) || c === 0x5F) {
            i++
            continue
          }
          break
        }
        i = this.consumeBigIntSuffix(i)
        return this.emitNumber(start, i)
      }
      if (next === 0x62 || next === 0x42) {
        i += 2
        while (i < length) {
          const c = source.charCodeAt(i)
          if (isBinaryDigit(c) || c === 0x5F) {
            i++
            continue
          }
          break
        }
        i = this.consumeBigIntSuffix(i)
        return this.emitNumber(start, i)
      }
    }

    // Decimal: digits[_digits]*[.digits[_digits]*]?
    while (i < length) {
      const c = source.charCodeAt(i)
      if (isDigit(c) || c === 0x5F) {
        i++
        continue
      }
      break
    }
    if (source.charCodeAt(i) === 0x2E /* . */) {
      i++
      while (i < length) {
        const c = source.charCodeAt(i)
        if (isDigit(c) || c === 0x5F) {
          i++
          continue
        }
        break
      }
    }
    i = this.consumeExponent(i)
    i = this.consumeBigIntSuffix(i)
    return this.emitNumber(start, i)
  }

  private consumeExponent(i: number): number {
    const source = this.parser.syntax
    const length = source.length
    const c = source.charCodeAt(i)
    if (c !== 0x65 && c !== 0x45 /* e/E */) {
      return i
    }
    let j = i + 1
    const sign = source.charCodeAt(j)
    if (sign === 0x2B || sign === 0x2D /* + or - */) {
      j++
    }
    if (!isDigit(source.charCodeAt(j))) {
      return i
    }
    j++
    while (j < length) {
      const cc = source.charCodeAt(j)
      if (isDigit(cc) || cc === 0x5F) {
        j++
        continue
      }
      break
    }
    return j
  }

  private consumeBigIntSuffix(i: number): number {
    if (this.parser.syntax.charCodeAt(i) === 0x6E /* n */) {
      return i + 1
    }
    return i
  }

  private emitNumber(start: number, end: number): Token {
    const value = this.parser.syntax.slice(start, end)
    this.cursor = end
    this.lastTokenType = Keyword.NUMBER
    return {
      type: Keyword.NUMBER,
      value,
      start,
      end,
    }
  }

  private scanIdentifierOrKeyword(start: number): Token {
    // Try keyword trie first; on a hit with passing boundary we emit the keyword.
    // Otherwise we fall back to identifier scanning (with multi-word support
    // and embedded-keyword truncation).
    const kw = this.matchKeyword(start)
    if (kw !== null) {
      this.cursor = kw.end
      this.lastTokenType = kw.type as string
      return {
        type: kw.type,
        value: this.parser.syntax.slice(start, kw.end),
        start,
        end: kw.end,
      }
    }
    return this.scanIdentifier(start)
  }

  private matchKeyword(start: number): { type: Keyword, end: number } | null {
    const source = this.parser.syntax
    const length = source.length
    let node: TrieNode | undefined = KEYWORD_TRIE
    let i = start
    let bestType: Keyword | null = null
    let bestEnd = -1

    while (i < length && node !== undefined) {
      const code = source.charCodeAt(i)
      const next = node.children.get(code)
      if (next === undefined)
        break
      i++
      node = next
      if (node.type !== null && this.boundaryOk(node.boundary, i)) {
        bestType = node.type
        bestEnd = i
      }
    }

    if (bestType !== null && bestEnd !== -1) {
      return { type: bestType, end: bestEnd }
    }
    return null
  }

  private boundaryOk(kind: BoundaryKind, end: number): boolean {
    if (kind === Boundary.NONE)
      return true
    if (end >= this.parser.syntax.length)
      return true
    const code = this.parser.syntax.charCodeAt(end)
    if (kind === Boundary.WORD) {
      // Mimic JS \b after ASCII word char: next must not be [A-Za-z0-9_]
      return !isAsciiWordChar(code)
    }
    // IDENT: next must not be [A-Za-zÀ-ỹ]
    return !isIdentStart(code)
  }

  private scanIdentifier(start: number): Token {
    const source = this.parser.syntax
    const length = source.length
    let i = start
    if (!isIdentStart(source.charCodeAt(i))) {
      throw new SyntaxError(`Unexpected token: "${source[i]}"`)
    }
    i++
    while (i < length && isIdentCont(source.charCodeAt(i))) {
      i++
    }

    // Multi-word identifier: consume ` <word>` repeatedly, but stop before
    // a word that would itself start a keyword at this position.
    while (i < length) {
      if (source.charCodeAt(i) !== 0x20 /* space */)
        break
      const wordStart = i + 1
      if (wordStart >= length)
        break
      const wordCode = source.charCodeAt(wordStart)
      if (!isIdentStart(wordCode))
        break
      // Embedded-keyword check: starting from wordStart, would a keyword
      // match? If yes, do NOT consume the space, terminate identifier here.
      if (this.matchKeyword(wordStart) !== null) {
        break
      }
      i = wordStart + 1
      while (i < length && isIdentCont(source.charCodeAt(i))) {
        i++
      }
    }

    const value = source.slice(start, i)
    this.cursor = i
    this.lastTokenType = Keyword.IDENTIFIER
    return {
      type: Keyword.IDENTIFIER,
      value,
      start,
      end: i,
    }
  }

  private scanOperator(start: number): Token | null {
    const source = this.parser.syntax
    const length = source.length
    let node: OperatorNode | undefined = OPERATOR_TRIE
    let i = start
    let bestEnd = -1
    let bestValue: string | null = null

    while (i < length && node !== undefined) {
      const code = source.charCodeAt(i)
      const next = node.children.get(code)
      if (next === undefined)
        break
      i++
      node = next
      if (node.value !== null) {
        bestEnd = i
        bestValue = node.value
      }
    }

    if (bestValue === null || bestEnd === -1) {
      return null
    }
    this.cursor = bestEnd
    this.lastTokenType = bestValue
    return {
      type: bestValue,
      value: bestValue,
      start,
      end: bestEnd,
    }
  }

  private scanRegexLiteral(start: number): Token | null {
    const source = this.parser.syntax
    const length = source.length
    let i = start + 1
    let inCharClass = false

    while (i < length) {
      const ch = source.charCodeAt(i)
      if (ch === 0x5C /* \ */) {
        i += 2
        continue
      }
      if (ch === 0x5B /* [ */) {
        inCharClass = true
        i++
        continue
      }
      if (ch === 0x5D /* ] */) {
        inCharClass = false
        i++
        continue
      }
      if (ch === 0x2F /* / */ && !inCharClass) {
        i++
        while (i < length) {
          const fc = source.charCodeAt(i)
          if (fc >= 0x61 && fc <= 0x7A) {
            i++
            continue
          }
          break
        }
        const value = source.slice(start, i)
        this.cursor = i
        return {
          type: 'RegExpLiteral',
          value,
          start,
          end: i,
        }
      }
      if (ch === 0x0A /* \n */) {
        return null
      }
      i++
    }
    return null
  }

  private scanTemplateLiteral(start: number): Token {
    const source = this.parser.syntax
    const length = source.length
    let i = start + 1

    while (i < length) {
      const ch = source.charCodeAt(i)

      if (ch === 0x5C /* \ */) {
        i += 2
        continue
      }

      if (ch === 0x60 /* ` */) {
        i++
        const value = source.slice(start, i)
        this.cursor = i
        this.lastTokenType = 'TemplateLiteral'
        return {
          type: 'TemplateLiteral',
          value,
          start,
          end: i,
        }
      }

      if (ch === 0x24 /* $ */ && source.charCodeAt(i + 1) === 0x7B /* { */) {
        i += 2
        let depth = 1
        while (i < length && depth > 0) {
          const inner = source.charCodeAt(i)
          if (inner === 0x5C) {
            i += 2
            continue
          }
          if (inner === 0x22 || inner === 0x27) {
            const quote = inner
            i++
            while (i < length && source.charCodeAt(i) !== quote) {
              if (source.charCodeAt(i) === 0x5C)
                i++
              i++
            }
            i++
            continue
          }
          if (inner === 0x60 /* ` */) {
            i++
            while (i < length) {
              if (source.charCodeAt(i) === 0x5C) {
                i += 2
                continue
              }
              if (source.charCodeAt(i) === 0x24
                && source.charCodeAt(i + 1) === 0x7B) {
                i += 2
                let innerDepth = 1
                while (i < length && innerDepth > 0) {
                  const ic = source.charCodeAt(i)
                  if (ic === 0x7B)
                    innerDepth++
                  else if (ic === 0x7D)
                    innerDepth--
                  i++
                }
                continue
              }
              if (source.charCodeAt(i) === 0x60) {
                i++
                break
              }
              i++
            }
            continue
          }
          if (inner === 0x7B)
            depth++
          else if (inner === 0x7D)
            depth--
          i++
        }
        continue
      }

      i++
    }

    throw new SyntaxError(`Template literal không đóng, bắt đầu tại vị trí ${start}`)
  }
}
