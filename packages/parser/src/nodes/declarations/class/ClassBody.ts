import type { Parser } from '@parser/parser'

import type { ClassProperty } from './ClassProperty'
import { ClassElementList } from './ClassElementList'

export class ClassBody {
  type = 'ClassBody'

  body: Array<ClassProperty> = []

  constructor(parser: Parser) {
    parser.eat('{')

    this.body = new ClassElementList(parser).properties

    parser.eat('}')
  }
}
