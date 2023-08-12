import { Expression } from "@parser/nodes/expressions/Expression";
import { FunctionExpression } from "@parser/nodes/expressions/FunctionExpression";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

export class ObjectMethod {
  type = "ObjectMethod";

  method = true;

  key: Identifier | Expression;

  computed = false;

  kind: "method" | "get" | "set" = "method";

  generator = false;

  async = false;

  params: FunctionExpression["params"] = [];

  body: FunctionExpression["body"];

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case Keyword.GET: {
        parser.eat(Keyword.GET);
        this.kind = "get";
        this.method = false;
        break;
      }
      case Keyword.SET: {
        parser.eat(Keyword.SET);
        this.kind = "set";
        this.method = false;
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

    const functionExpression = new FunctionExpression(parser, true);

    this.generator = functionExpression.generator;
    this.params = functionExpression.params;
    this.body = functionExpression.body;
  }
}
