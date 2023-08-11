import { Identifier } from "@parser/nodes/identifier/Identifier";
import { MethodDefinition } from "@parser/nodes/declarations/class/MethodDefinition";
import { PropertyDefinition } from "@parser/nodes/declarations/class/PropertyDefinition";
import { Parser } from "@parser/parser";

export class ObjectExpression {
  type = "ObjectExpression";

  body: Array<MethodDefinition | PropertyDefinition> = [];

  constructor(parser: Parser) {
    parser.eat("{");

    while (parser.lookahead?.type !== "}") {
      const isGetter = parser.lookahead?.type === "Get";

      if (isGetter) {
        parser.eat("Get");
      }
      const isSetter = parser.lookahead?.type === "Set";

      if (isSetter) {
        parser.eat("Set");
      }

      let isComputed = false,
        isAsync = false,
        identifier: Identifier | null = null;

      if (!isGetter && !isSetter) {
        isAsync = parser.lookahead?.type === "Async";

        if (isAsync) {
          parser.eat("Async");
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
