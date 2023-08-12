import { Parser } from "@parser/parser";
import { Expression } from "@parser/nodes/expressions/Expression";
import { Statement } from "@parser/nodes/statements/Statement";
import { StatementList } from "@parser/nodes/statements/StatementList";
import { Keyword } from "@vietscript/shared";

export class SwitchStatement {
  type = "SwitchStatement";

  discriminant: Expression;

  cases: Array<{
    type: "SwitchCase";
    test: Expression | null;
    consequent: Array<Statement>;
  }> = [];

  constructor(parser: Parser) {
    parser.eat(Keyword.SWITCH);
    parser.eat("(");

    this.discriminant = new Expression(parser);

    parser.eat(")");
    parser.eat("{");

    while (![Keyword.DEFAULT, "}"].includes(parser.lookahead?.type as string)) {
      let hasConsequent = false;

      parser.eat(Keyword.CASE);

      const test = new Expression(parser);

      parser.eat(":");

      while (![Keyword.CASE, Keyword.DEFAULT, "}"].includes(parser.lookahead?.type as string)) {
        this.cases.push({
          type: "SwitchCase",
          test,
          consequent: new StatementList(parser, [Keyword.CASE, Keyword.DEFAULT, "}"]).body,
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

    if (parser.lookahead?.type === Keyword.DEFAULT) {
      parser.eat(Keyword.DEFAULT);
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
