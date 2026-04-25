import type { Token } from '@vietscript/shared'
import { Keyword } from '@vietscript/shared'

import { VietScriptError } from './errors'
import { Program } from './nodes/Program'
import { Tokenizer } from './tokenizer'
import { TokenizerFSM } from './tokenizer-fsm'

export type TokenizerKind = 'regex' | 'fsm'

export interface ITokenizer {
  getNextToken: () => Token | null
  isEOF: () => boolean
  rollback: (step: number) => number
}

export interface ParserOptions {
  tokenizer?: TokenizerKind
}

export function createTokenizer(parser: Parser): ITokenizer {
  return parser.tokenizerKind === 'fsm'
    ? new TokenizerFSM(parser)
    : new Tokenizer(parser)
}

export class Parser {
  public syntax: string

  public tokenizer: ITokenizer

  public tokenizerKind: TokenizerKind

  public lookahead: Token | null

  public filename?: string

  public ternaryDepth = 0

  constructor(options: ParserOptions = {}) {
    this.syntax = ''
    this.tokenizerKind = options.tokenizer ?? 'fsm'
    this.tokenizer = createTokenizer(this)
    this.lookahead = null
  }

  public parse(syntax: string, InitAtsNodeClass?: new (parser: Parser) => unknown): any {
    this.syntax = syntax
    this.tokenizer = createTokenizer(this)
    this.lookahead = this.tokenizer.getNextToken()

    if (InitAtsNodeClass)
      return new InitAtsNodeClass(this)

    return new Program(this)
  }

  eat(tokenType: Token['type']): Token {
    const token = this.lookahead

    if (token === null) {
      throw new VietScriptError(`Unexpected end of input, expected: "${tokenType}"`, {
        file: this.filename,
        source: this.syntax,
        offset: this.syntax.length,
      })
    }

    if (token.type !== tokenType) {
      if (tokenType === Keyword.IDENTIFIER) {
        throw new VietScriptError(
          `Unexpected token: "${token.value}", cannot use keyword "${token.value}" for the beginning of the identifer`,
          {
            file: this.filename,
            source: this.syntax,
            offset: token.start,
          },
        )
      }
      throw new VietScriptError(`Unexpected token: "${token.value}", expected: "${tokenType}"`, {
        file: this.filename,
        source: this.syntax,
        offset: token.start,
      })
    }

    this.lookahead = this.tokenizer.getNextToken()

    return token
  }
}
