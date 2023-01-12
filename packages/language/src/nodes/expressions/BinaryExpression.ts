import { Parser } from "@lang/parser";
import { Identifier } from "@lang/nodes/identifier/Identifier";
import { Expression } from "@lang/nodes/expressions/Expression";

export class BinaryExpression {
  type = "BinaryExpression";

  left: Identifier | Expression;

  operator: string;

  right: Identifier | Expression;

  constructor(parser: Parser, identifier?: Identifier) {
    this.left =
      identifier ??
      (parser.lookahead?.type === "Identifier" ? new Identifier(parser) : new Expression(parser));

    switch (parser.lookahead?.type) {
      case ">": {
        this.operator = String(parser.eat(">").value);
        break;
      }
      case "<": {
        this.operator = String(parser.eat("<").value);
        break;
      }
      case ">=": {
        this.operator = String(parser.eat(">=").value);
        break;
      }
      case "<=": {
        this.operator = String(parser.eat("<=").value);
        break;
      }
      case "==": {
        this.operator = String(parser.eat("==").value);
        break;
      }
      case "===": {
        this.operator = String(parser.eat("===").value);
        break;
      }
    }

    this.right =
      parser.lookahead?.type === "Identifier" ? new Identifier(parser) : new Expression(parser);
  }
}
