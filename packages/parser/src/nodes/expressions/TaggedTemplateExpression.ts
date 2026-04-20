import type { Identifier } from '@parser/nodes/identifier/Identifier'
import type { Parser } from '@parser/parser'

import { TemplateLiteral } from '../literals/TemplateLiteral'

export class TaggedTemplateExpression {
  type = 'TaggedTemplateExpression'

  tag: Identifier

  quasi: TemplateLiteral

  constructor(parser: Parser, tag: Identifier) {
    this.tag = tag
    this.quasi = new TemplateLiteral(parser)
  }
}
