import { Parser } from "@lang/parser";
import { Identifier } from "@lang/nodes/identifier/Identifier";
import { Expression } from "@lang/nodes/expressions/Expression";

export class LogicalExpression {
  type = "LogicalExpression";

  left: Identifier | Expression;

  operator: string;

  right: Identifier | Expression;

  constructor(parser: Parser, identifier?: Identifier) {
    this.left =
      identifier ??
      (parser.lookahead?.type === "Identifier" ? new Identifier(parser) : new Expression(parser));

    switch (parser.lookahead?.type as string) {
      case "??":
      case "||":
      case "&&": {
        this.operator = String(parser.eat(String(parser.lookahead?.type)).value);
        break;
      }
      default: {
        throw new Error("Invalid operator for LogicalExpression");
      }
    }

    this.right =
      parser.lookahead?.type === "Identifier" ? new Identifier(parser) : new Expression(parser);
  }
}
