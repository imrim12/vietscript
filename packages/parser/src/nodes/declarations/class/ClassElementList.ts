import { Parser } from "@parser/parser";

import { ClassProperty } from "./ClassProperty";

export class ClassElementList {
  type = "ClassElementList";

  properties: Array<ClassProperty> = [];

  constructor(parser: Parser) {
    while (parser.lookahead?.type !== "}") {
      this.properties.push(new ClassProperty(parser));
    }
  }
}
