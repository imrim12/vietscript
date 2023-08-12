import { Parser } from "@parser/parser";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Expression } from "@parser/nodes/expressions/Expression";
import { Keyword } from "@vietscript/shared";

export class LogicalExpression {
  type = "LogicalExpression";

  left: Identifier | Expression;

  operator: string;

  right: Identifier | Expression;

  constructor(parser: Parser, identifier?: Identifier) {
    this.left =
      identifier ?? (parser.lookahead?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser));

    switch (parser.lookahead?.type) {
      case "??":
      case "||":
      case "&&": {
        this.operator = String(parser.eat(parser.lookahead?.type).value);
        break;
      }
    }

    this.right = parser.lookahead?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser);
  }
}
