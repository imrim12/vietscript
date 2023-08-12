import { Parser } from "@parser/parser";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Keyword } from "@vietscript/shared";

export class UpdateExpression {
  type = "UpdateExpression";

  operator: string;

  argument: Identifier;

  prefix: boolean;

  constructor(parser: Parser) {
    if (parser.lookahead?.type === "++" || parser.lookahead?.type === "--") {
      this.prefix = true;
      this.operator = String(parser.eat(parser.lookahead.type).value);

      this.argument = new Identifier(parser);
    } else if (parser.lookahead?.type === Keyword.IDENTIFIER) {
      this.argument = new Identifier(parser);

      this.prefix = false;
      this.operator = String(parser.eat(parser.lookahead.type).value);
    }
  }
}
