import { Parser } from "@lang/parser";
import { Identifier } from "@lang/nodes/identifier/Identifier";

export class UpdateExpression {
  type = "UpdateExpression" as const;

  operator: string;

  argument: Identifier;

  prefix: boolean;

  constructor(parser: Parser) {
    if (parser.lookahead?.type === "++" || parser.lookahead?.type === "--") {
      this.prefix = true;
      this.operator = String(parser.eat(parser.lookahead.type).value);

      this.argument = new Identifier(parser);
    } else if (parser.lookahead?.type === "Identifier") {
      this.argument = new Identifier(parser);

      this.prefix = false;
      this.operator = String(parser.eat(parser.lookahead.type).value);
    }
  }
}
