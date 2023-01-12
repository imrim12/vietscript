import { Parser } from "@lang/parser";

import { Expression } from "../expressions/Expression";

import { BlockStatement } from "./BlockStatement";
import { Statement } from "./Statement";

export class IfStatement {
  type = "IfStatement" as const;

  test:
    | {
        type: "Identifier";
        name: string;
      }
    | Expression;

  consequent: Statement | BlockStatement;

  alternate?: Statement | BlockStatement;

  constructor(parser: Parser) {
    parser.eat("If");

    parser.eat("(");

    this.test =
      parser.lookahead?.type === "Identifier"
        ? {
            type: "Identifier",
            name: String(parser.eat("Identifier")?.value),
          }
        : new Expression(parser);

    parser.eat(")");

    this.consequent =
      parser.lookahead?.type === "{" ? new BlockStatement(parser) : new Statement(parser);

    if (parser.lookahead?.type === "Else") {
      parser.eat("Else");

      // @ts-ignore
      if (parser.lookahead?.type === "If") {
        this.alternate = new IfStatement(parser);
      } else {
        this.alternate =
          // @ts-ignore
          parser.lookahead?.type === "{" ? new BlockStatement(parser) : new Statement(parser);
      }
    }
  }
}
