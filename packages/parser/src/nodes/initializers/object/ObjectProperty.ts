import { Expression } from "@parser/nodes/expressions/Expression";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Parser } from "@parser/parser";

export class ObjectProperty {
  type = "ObjectProperty";

  method = false;

  computed = false;

  shorthand = false;

  key: Identifier | Expression;

  value: Identifier | Expression;

  constructor(parser: Parser) {
    if (parser.lookahead?.type === "[") {
      parser.eat("[");
      this.key = new Expression(parser);
      this.computed = true;
      parser.eat("]");
    } else {
      this.key = new Identifier(parser);
    }

    if (parser.lookahead?.type === ":") {
      parser.eat(":");
      this.value = new Expression(parser);
    } else if (!this.computed) {
      this.value = this.key;
      this.shorthand = true;
    } else {
      throw new SyntaxError(`Computed property key phải có giá trị theo sau`);
    }
  }
}
