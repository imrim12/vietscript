import { Parser } from "@lang/parser";

import { BooleanLiteral } from "./BooleanLiteral";
import { NaNLiteral } from "./NaNLiteral";
import { NullLiteral } from "./NullLiteral";
import { NumericLiteral } from "./NumericLiteral";
import { StringLiteral } from "./StringLiteral";
import { UndefinedLiteral } from "./UndefinedLiteral";

export class Literal {
  node: {
    type: "Literal";
    value: number | boolean | string | null | undefined;
    raw: string;
  };

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case "Number": {
        this.node = { ...new NumericLiteral(parser).node, type: "Literal" };
        break;
      }
      case "String": {
        this.node = { ...new StringLiteral(parser).node, type: "Literal" };
        break;
      }
      case "Boolean": {
        this.node = { ...new BooleanLiteral(parser).node, type: "Literal" };
        break;
      }
      case "NaN": {
        this.node = { ...new NaNLiteral(parser).node, type: "Literal" };
        break;
      }
      case "Null": {
        this.node = { ...new NullLiteral(parser).node, type: "Literal" };
        break;
      }
      case "Undefined": {
        this.node = { ...new UndefinedLiteral(parser).node, type: "Literal" };
        break;
      }
    }
  }
}
