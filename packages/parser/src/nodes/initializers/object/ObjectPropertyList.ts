import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

import { ObjectProperty } from "./ObjectProperty";
import { ObjectMethod } from "./ObjectMethod";

export class ObjectPropertyList {
  properties: Array<ObjectProperty | ObjectMethod> = [];

  constructor(parser: Parser, stopToken = "}") {
    while (parser.lookahead?.type !== stopToken) {
      switch (parser.lookahead?.type) {
        case Keyword.GET:
        case Keyword.SET:
        case Keyword.ASYNC: {
          this.properties.push(new ObjectMethod(parser));
          break;
        }
        default: {
          this.properties.push(new ObjectProperty(parser));
        }
      }

      if (parser.lookahead?.type !== stopToken) {
        parser.eat(",");
      }
    }
  }
}
