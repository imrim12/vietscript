import { Expression } from "@lang/nodes/expressions/Expression";
import { Parser } from "@lang/parser";

export class PropertyDefinition {
  type: "PropertyDefinition";

  static: boolean;

  computed: boolean;

  key: {
    type: "Identifier";
    name: string;
  };

  value: null | Expression;

  constructor(
    parser: Parser,
    isStatic: boolean,
    isComputed: boolean,
    key: {
      type: "Identifier";
      name: string;
    },
  ) {
    this.type = "PropertyDefinition";
    this.static = isStatic;
    this.computed = isComputed;
    this.key = key;

    if (parser.lookahead?.type === "=") {
      parser.eat("=");
      this.value = new Expression(parser);
    } else {
      this.value = null;
    }
  }
}
