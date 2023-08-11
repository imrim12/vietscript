import { Parser } from "@lang/parser";
import { Identifier } from "@lang/nodes/identifier/Identifier";

import { ClassBody } from "./class/ClassBody";

export class ClassDeclaration {
  type = "ClassDeclaration";

  id: Identifier;

  superClass: null | Identifier = null;

  body: ClassBody;

  constructor(parser: Parser) {
    parser.eat("Class");

    this.id = new Identifier(parser);

    if (parser.lookahead?.type === "(") {
      parser.eat("(");

      this.superClass = new Identifier(parser);

      parser.eat(")");
    }

    this.body = new ClassBody(parser);
  }
}
