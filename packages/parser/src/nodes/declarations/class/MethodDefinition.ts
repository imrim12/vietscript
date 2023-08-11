import { FunctionExpression } from "@lang/nodes/expressions/FunctionExpression";
import { Identifier } from "@lang/nodes/identifier/Identifier";
import { Parser } from "@lang/parser";

export class MethodDefinition {
  type = "MethodDefinition";

  static: boolean;

  computed: boolean;

  key: Identifier;

  kind: "method" | "get" | "set";

  value: FunctionExpression;

  constructor(
    parser: Parser,
    isStatic: boolean,
    isAsync: boolean,
    isComputed: boolean,
    key: Identifier,
    kind: "method" | "get" | "set",
  ) {
    this.static = isStatic;
    this.computed = isComputed;
    this.kind = kind || "method";
    this.key = key;

    this.value = new FunctionExpression(parser, true, isAsync);
  }
}
