import { Parser } from "@parser/parser";

import { ObjectLiteral } from "../literals/ObjectLiteral";

export class ObjectExpression {
  type = "ObjectExpression";

  properties: ObjectLiteral["properties"] = [];

  constructor(parser: Parser) {
    this.properties = new ObjectLiteral(parser).properties;
  }
}
