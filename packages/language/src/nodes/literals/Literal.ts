import { BooleanLiteral } from "./BooleanLiteral";
import { NaNLiteral } from "./NaNLiteral";
import { NullLiteral } from "./NullLiteral";
import { NumericLiteral } from "./NumericLiteral";
import { StringLiteral } from "./StringLiteral";
import { UndefinedLiteral } from "./UndefinedLiteral";

import { Parser } from "@lang/parser";
import { BaseAtsNode } from "@lang/nodes/BaseAtsNode";

export class Literal extends BaseAtsNode<any> {
  literal: any;

  constructor(parser: Parser) {
    super();
    switch (parser.lookahead?.type) {
      case "NUMBER": {
        this.literal = new NumericLiteral(parser);
        break;
      }
      case "STRING": {
        this.literal = new StringLiteral(parser);
        break;
      }
      case "BOOLEAN": {
        this.literal = new BooleanLiteral(parser);
        break;
      }
      case "NAN": {
        this.literal = new NaNLiteral(parser);
        break;
      }
      case "NULL": {
        this.literal = new NullLiteral(parser);
        break;
      }
      case "UNDEFINED": {
        this.literal = new UndefinedLiteral(parser);
        break;
      }
    }

    this.value = this.literal.value;
    this.node = this.literal.node;
  }
}
