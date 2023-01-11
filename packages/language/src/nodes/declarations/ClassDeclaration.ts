import { Parser } from "@lang/parser";

import { MethodDefinition } from "./class/MethodDefinition";
import { PropertyDefinition } from "./class/PropertyDefinition";

export class ClassDeclaration {
  type: "ClassDeclaration";

  id: {
    type: "Identifier";
    name: string;
  };

  body: {
    type: "ClassBody";
    body: Array<MethodDefinition | PropertyDefinition>;
  };

  constructor(parser: Parser) {
    parser.eat("Class");

    this.id = {
      type: "Identifier",
      name: String(parser.eat("Identifier").value),
    };
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
        identifier: {
          type: "Identifier";
          name: string;
        } | null = null;

      if (!isGetter && !isSetter) {
        isStatic = parser.lookahead?.type === "Static";

        if (isStatic) {
          parser.eat("Static");
        }
        isComputed = parser.lookahead?.type === "[";

        if (isComputed) {
          parser.eat("[");

          identifier = {
            type: "Identifier",
            name: String(parser.eat("Identifier").value),
          };

          parser.eat("]");
        }
      }

      if (identifier === null) {
        identifier = {
          type: "Identifier" as const,
          name: String(parser.eat("Identifier").value),
        };
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
    this.type = "ClassDeclaration";
  }
}
