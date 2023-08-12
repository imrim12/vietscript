import { Parser } from "@parser/parser";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Expression } from "@parser/nodes/expressions/Expression";
import { Keyword } from "@vietscript/shared";

export class AssignmentExpression {
  type = "AssignmentExpression";

  left: Identifier | Expression;

  operator: string;

  right: Identifier | Expression;

  constructor(parser: Parser, identifier?: Identifier | Expression) {
    this.left =
      identifier ?? (parser.lookahead?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser));

    this.operator = String(parser.eat("=").value);

    this.right = parser.lookahead?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser);
  }
}
