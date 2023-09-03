import { Keyword } from "@vietscript/shared";
import { Parser } from "@parser/parser";
import { isExpression } from "@parser/utils/is-expression";

import { Expression } from "./Expression";

export class YieldExpression {
  type = "YieldExpression";

  delegate = false;

  argument: Expression | null = null;

  constructor(parser: Parser) {
    parser.eat(Keyword.YIELD);

    if (parser.lookahead?.type === "*") {
      this.delegate = true;

      this.argument = new Expression(parser);
    } else if (isExpression(parser)) {
      this.argument = new Expression(parser);
    }
  }
}
