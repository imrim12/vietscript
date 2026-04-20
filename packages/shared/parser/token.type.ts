import type { Keyword } from './keyword.enum'
import type { Operator } from './operator.type'

export type TokenType = Keyword | Operator | (string & {}) | null

export interface Token {
  type: TokenType
  value: string | number
  start: number
  end: number
}
