import { Parser } from "@lang/parser";
import { Identifier } from "@lang/nodes/identifier/Identifier";

import { MethodDefinition } from "./class/MethodDefinition";
import { PropertyDefinition } from "./class/PropertyDefinition";

export class ClassDeclaration {
  type = "ClassDeclaration";

  id: Identifier;

  body: {
    type: "ClassBody";
    body: Array<MethodDefinition | PropertyDefinition>;
  };

  constructor(parser: Parser) {
    parser.eat("Class");

    this.id = new Identifier(parser);
    parser.eat("{");

    this.body = {
      type: "ClassBody",
      body: [],
    };

    while (parser.lookahead?.type !== "}") {
      const isGetter = parser.lookahead?.type === "Get";

      if (isGetter) {
        parser.eat("Get");
      }
      const isSetter = parser.lookahead?.type === "Set";

      if (isSetter) {
        parser.eat("Set");
      }

      let isStatic = false,
        isComputed = false,
        identifier: Identifier | null = null;

      if (!isGetter && !isSetter) {
        isStatic = parser.lookahead?.type === "Static";

        if (isStatic) {
          parser.eat("Static");
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
        this.body.body.push(
          new MethodDefinition(
            parser,
            isStatic,
            isComputed,
            identifier,
            isGetter ? "get" : isSetter ? "set" : "method",
          ),
        );
      } else {
        this.body.body.push(new PropertyDefinition(parser, isStatic, isComputed, identifier));
      }
    }

    parser.eat("}");
  }
}
