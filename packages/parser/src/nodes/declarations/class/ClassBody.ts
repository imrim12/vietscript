import { Parser } from "@parser/parser";

import { ClassElementList } from "./ClassElementList";
import { ClassProperty } from "./ClassProperty";

export class ClassBody {
  type = "ClassBody";

  body: Array<ClassProperty> = [];

  constructor(parser: Parser) {
    parser.eat("{");

    this.body = new ClassElementList(parser).properties;

    parser.eat("}");
  }
}
