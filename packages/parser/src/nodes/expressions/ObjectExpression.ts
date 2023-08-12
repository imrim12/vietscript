import { Identifier } from "@parser/nodes/identifier/Identifier";
import { MethodDefinition } from "@parser/nodes/declarations/class/MethodDefinition";
import { PropertyDefinition } from "@parser/nodes/declarations/class/PropertyDefinition";
import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

export class ObjectExpression {
  type = "ObjectExpression";

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

      let isComputed = false,
        isAsync = false,
        identifier: Identifier | null = null;

      if (!isGetter && !isSetter) {
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
            false,
            isAsync,
            isComputed,
            identifier,
            isGetter ? "get" : isSetter ? "set" : "method",
          ),
        );
      } else {
        this.body.push(new PropertyDefinition(parser, false, isComputed, identifier, ":"));
      }

      if (parser.lookahead?.type !== "}") {
        parser.eat(",");
      }
    }

    parser.eat("}");
  }
}
