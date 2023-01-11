import { FunctionExpression } from "@lang/nodes/expressions/FunctionExpression";
import { Parser } from "@lang/parser";

export class MethodDefinition {
  type: "MethodDefinition";

  static: boolean;

  computed: boolean;

  key: {
    type: "Identifier";
    name: string;
  };

  kind: "method" | "get" | "set";

  value: FunctionExpression;

  constructor(
    parser: Parser,
    isStatic: boolean,
    isComputed: boolean,
    key: {
      type: "Identifier";
      name: string;
    },
    kind: "method" | "get" | "set",
  ) {
    this.type = "MethodDefinition";
    this.static = isStatic;
    this.computed = isComputed;
    this.kind = kind || "method";
    this.key = key;

    this.value = new FunctionExpression(parser);
  }
}
