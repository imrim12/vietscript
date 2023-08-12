import { Expression } from "@parser/nodes/expressions/Expression";
import { FunctionExpression } from "@parser/nodes/expressions/FunctionExpression";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

export class ClassMethod {
  type = "ClassMethod";

  async = false;

  static = false;

  computed = false;

  key: Identifier | Expression;

  kind: "method" | "get" | "set" = "method";

  value: FunctionExpression;

  constructor(parser: Parser, isStatic = false) {
    this.static = isStatic;
    switch (parser.lookahead?.type) {
      case Keyword.GET: {
        parser.eat(Keyword.GET);
        this.kind = "get";
        break;
      }
      case Keyword.SET: {
        parser.eat(Keyword.SET);
        this.kind = "set";
        break;
      }
      case Keyword.ASYNC: {
        parser.eat(Keyword.ASYNC);
        this.async = true;
        break;
      }
    }

    if (parser.lookahead?.type === "[") {
      parser.eat("[");
      this.key = new Expression(parser);
      this.computed = true;
      parser.eat("]");
    } else {
      this.key = new Identifier(parser);
    }

    this.value = new FunctionExpression(parser, true);
  }
}
