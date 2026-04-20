import type { VariableDeclaration } from '@parser/nodes/declarations/VariableDeclaration'
import type { Identifier } from '@parser/nodes/identifier/Identifier'
import type { Parser } from '@parser/parser'

export class ForInOfStatement {
  type: 'ForInStatement' | 'ForOfStatement'

  await: boolean

  left: VariableDeclaration | Identifier

  right: Identifier

  constructor(parser: Parser, isAsync: boolean) {
    this.await = isAsync
  }
}
