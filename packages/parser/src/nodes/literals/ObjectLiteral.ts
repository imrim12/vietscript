import { Parser } from "@parser/parser";

import { ObjectPropertyList } from "../initializers/object/ObjectPropertyList";

export class ObjectLiteral {
  type = "ObjectLiteral";

  properties: ObjectPropertyList["properties"] = [];

  constructor(parser: Parser) {
    parser.eat("{");

    this.properties = new ObjectPropertyList(parser).properties;

    parser.eat("}");
  }
}
