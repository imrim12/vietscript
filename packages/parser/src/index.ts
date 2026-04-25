import { Parser } from './parser'

const parser = new Parser()

export default parser

export { VietScriptError } from './errors'
export { Parser } from './parser'
export type { ITokenizer, ParserOptions, TokenizerKind } from './parser'
export { Tokenizer } from './tokenizer'
export { TokenizerFSM } from './tokenizer-fsm'

if (typeof window !== 'undefined') {
  (window as unknown as { VietScript: { parser: Parser } }).VietScript = { parser }
}
