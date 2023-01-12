import { Parser } from "@lang/parser";

export class UpdateExpression {
  type = "UpdateExpression" as const;

  operator: string;

  argument: {
    type: "Identifier";
    name: string;
  };

  prefix: boolean;

  constructor(parser: Parser) {
    if (parser.lookahead?.type === "++" || parser.lookahead?.type === "--") {
      this.prefix = true;
      this.operator = String(parser.eat(parser.lookahead.type).value);

      this.argument = {
        type: "Identifier",
        name: String(parser.eat("Identifier").value),
      };
    } else if (parser.lookahead?.type === "Identifier") {
      this.argument = {
        type: "Identifier",
        name: String(parser.eat("Identifier").value),
      };

      this.prefix = false;
      this.operator = String(parser.eat(parser.lookahead.type).value);
    }
  }
}
