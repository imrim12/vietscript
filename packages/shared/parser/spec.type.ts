import type { Keyword } from './keyword.enum'
import type { Operator } from './operator.type'

export type Spec = [RegExp, Keyword | Operator | null]
