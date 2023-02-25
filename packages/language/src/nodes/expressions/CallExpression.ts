import { Parser } from "@lang/parser";
import { Identifier } from "@lang/nodes/identifier/Identifier";
import { Expression } from "@lang/nodes/expressions/Expression";

export class CallExpression {
  type = "CallExpression";

  callee: Identifier | Expression;

  arguments: Array<Identifier | Expression> = [];

  optional = false;

  constructor(parser: Parser, identifier: Identifier | Expression) {
    this.callee = identifier;

    parser.eat("(");

    while (parser.lookahead?.type !== ")") {
      if (this.arguments.length > 0) {
        parser.eat(",");
      }

      this.arguments.push(new Identifier(parser));
    }

    parser.eat(")");
  }
}
