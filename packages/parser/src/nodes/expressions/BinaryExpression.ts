import { Parser } from "@parser/parser";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Expression } from "@parser/nodes/expressions/Expression";

export class BinaryExpression {
  type = "BinaryExpression";

  left: Identifier | Expression;

  operator: string;

  right: Identifier | Expression;

  constructor(parser: Parser, identifier?: Identifier) {
    this.left =
      identifier ??
      (parser.lookahead?.type === "Identifier" ? new Identifier(parser) : new Expression(parser));

    switch (parser.lookahead?.type as string) {
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
      case "**":
      case "^":
      case ">":
      case ">>":
      case ">>>":
      case "<":
      case "<<":
      case "<<<":
      case ">=":
      case "<=":
      case "==":
      case "===": {
        this.operator = String(parser.eat(String(parser.lookahead?.type)).value);
        break;
      }
      default: {
        throw new Error("Invalid operator for BinaryExpression");
      }
    }

    this.right =
      parser.lookahead?.type === "Identifier" ? new Identifier(parser) : new Expression(parser);
  }
}
