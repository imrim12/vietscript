import { Expression } from "@lang/nodes/expressions/Expression";
import { Identifier } from "@lang/nodes/identifier/Identifier";
import { Parser } from "@lang/parser";

export class PropertyDefinition {
  type = "PropertyDefinition";

  static: boolean;

  computed: boolean;

  key: Identifier;

  value: null | Expression;

  constructor(
    parser: Parser,
    isStatic: boolean,
    isComputed: boolean,
    key: Identifier,
    declarator = "=",
  ) {
    this.static = isStatic;
    this.computed = isComputed;
    this.key = key;

    if (parser.lookahead?.type === declarator) {
      parser.eat(declarator);
      this.value = new Expression(parser);
    } else {
      this.value = null;
    }
  }
}
