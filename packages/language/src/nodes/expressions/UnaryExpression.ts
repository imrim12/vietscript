import { Parser } from "@lang/parser";
import { Expression } from "@lang/nodes/expressions/Expression";

export class UnaryExpression {
  type = "UnaryExpression";

  operator: string;

  prefix: boolean;

  constructor(parser: Parser) {
    if (["+", "-", "~", "!"].includes(String(parser.lookahead?.type))) {
      Object.assign(this, new Expression(parser));
    }
  }
}
