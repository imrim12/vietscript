import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

import { MethodDefinition } from "./MethodDefinition";
import { PropertyDefinition } from "./PropertyDefinition";

export class ClassBody {
  type = "ClassBody";

  body: Array<MethodDefinition | PropertyDefinition> = [];

  constructor(parser: Parser) {
    parser.eat("{");

    while (parser.lookahead?.type !== "}") {
      const isGetter = parser.lookahead?.type === Keyword.GET;

      if (isGetter) {
        parser.eat(Keyword.GET);
      }
      const isSetter = parser.lookahead?.type === Keyword.SET;

      if (isSetter) {
        parser.eat(Keyword.SET);
      }

      let isStatic = false,
        isComputed = false,
        isAsync = false,
        identifier: Identifier | null = null;

      if (!isGetter && !isSetter) {
        isStatic = parser.lookahead?.type === Keyword.STATIC;

        if (isStatic) {
          parser.eat(Keyword.STATIC);
        }

        isAsync = parser.lookahead?.type === Keyword.ASYNC;

        if (isAsync) {
          parser.eat(Keyword.ASYNC);
        }

        isComputed = parser.lookahead?.type === "[";

        if (isComputed) {
          parser.eat("[");

          identifier = new Identifier(parser);

          parser.eat("]");
        }
      }

      if (identifier === null) {
        identifier = new Identifier(parser);
      }

      if (parser.lookahead?.type === "(") {
        this.body.push(
          new MethodDefinition(
            parser,
            isStatic,
            isAsync,
            isComputed,
            identifier,
            isGetter ? "get" : isSetter ? "set" : "method",
          ),
        );
      } else {
        this.body.push(new PropertyDefinition(parser, isStatic, isComputed, identifier));
      }
    }

    parser.eat("}");
  }
}
