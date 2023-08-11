import { Parser } from "@lang/parser";
import { Expression } from "@lang/nodes/expressions/Expression";

export class UnaryExpression {
  type = "UnaryExpression";

  operator: string;

  prefix: boolean;

  argument: Expression;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type as string) {
      case "delete":
      case "void":
      case "typeof":
      case "+":
      case "-":
      case "~":
      case "!": {
        this.operator = String(parser.eat(String(parser.lookahead?.type)).value);
        this.prefix = true;
        this.argument = new Expression(parser);
        break;
      }
    }
  }
}
