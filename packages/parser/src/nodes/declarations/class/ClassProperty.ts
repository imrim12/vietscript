import { Expression } from "@parser/nodes/expressions/Expression";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { PrivateName } from "@parser/nodes/identifier/PrivateName";
import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

import { ClassMethod } from "./ClassMethod";

export class ClassProperty {
  type = "ClassProperty";

  static = false;

  computed = false;

  key: Identifier | Expression | PrivateName;

  value: null | Expression;

  constructor(parser: Parser) {
    if (parser.lookahead?.type === Keyword.STATIC) {
      parser.eat(Keyword.STATIC);
      this.static = true;
    }

    switch (parser.lookahead?.type) {
      case Keyword.GET:
      case Keyword.SET:
      case Keyword.ASYNC: {
        Object.assign(this, new ClassMethod(parser));
        break;
      }
      default: {
        if (parser.lookahead?.type === "[") {
          parser.eat("[");
          this.key = new Expression(parser);
          this.computed = true;
          parser.eat("]");
        } else if (parser.lookahead?.type === "#") {
          this.key = new PrivateName(parser);
          this.type = "ClassPrivateProperty" as any;
        } else {
          this.key = new Identifier(parser);
        }

        if (parser.lookahead?.type === "=") {
          parser.eat("=");
          this.value = new Expression(parser);
        } else {
          this.value = null;
        }
      }
    }
  }
}
