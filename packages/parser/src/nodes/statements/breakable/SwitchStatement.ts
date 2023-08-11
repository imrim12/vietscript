import { Parser } from "@parser/parser";
import { Expression } from "@parser/nodes/expressions/Expression";
import { Statement } from "@parser/nodes/statements/Statement";
import { StatementList } from "@parser/nodes/statements/StatementList";

export class SwitchStatement {
  type = "SwitchStatement";

  discriminant: Expression;

  cases: Array<{
    type: "SwitchCase";
    test: Expression | null;
    consequent: Array<Statement>;
  }> = [];

  constructor(parser: Parser) {
    parser.eat("Switch");
    parser.eat("(");

    this.discriminant = new Expression(parser);

    parser.eat(")");
    parser.eat("{");

    while (parser.lookahead?.type !== "Default" && parser.lookahead?.type !== "}") {
      let hasConsequent = false;

      parser.eat("Case");

      const test = new Expression(parser);

      parser.eat(":");

      while (
        parser.lookahead?.type !== "Case" &&
        parser.lookahead?.type !== "Default" &&
        parser.lookahead?.type !== "}"
      ) {
        this.cases.push({
          type: "SwitchCase",
          test,
          consequent: new StatementList(parser, ["Case", "Default", "}"]).body,
        });
        hasConsequent = true;
      }

      if (!hasConsequent) {
        this.cases.push({
          type: "SwitchCase",
          test,
          consequent: [],
        });
      }
    }

    if (parser.lookahead?.type === "Default") {
      parser.eat("Default");
      parser.eat(":");
      this.cases.push({
        type: "SwitchCase",
        test: null,
        consequent: new StatementList(parser).body,
      });
    }

    parser.eat("}");
  }
}
