import { Parser } from "@lang/parser";

import { Expression } from "./Expression";

// https://262.ecma-international.org/13.0/#prod-PrimaryExpression
export class PrimaryExpression {
  constructor(parser: Parser) {
    switch (parser.lookahead?.type as string) {
      default: {
        Object.assign(this, new Expression(parser));
      }
    }
  }
}
