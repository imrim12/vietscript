import { Parser } from './parser'

const parser = new Parser()

export default parser

export { VietScriptError } from './errors'
export { Parser } from './parser'
export { Tokenizer } from './tokenizer'

if (typeof window !== 'undefined') {
  (window as unknown as { VietScript: { parser: Parser } }).VietScript = { parser }
}
