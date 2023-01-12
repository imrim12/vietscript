import { Parser } from "@lang/parser";
import { BlockStatement } from "@lang/nodes/statements/BlockStatement";
import { Identifier } from "@lang/nodes/identifier/Identifier";

export class FunctionExpression {
  type: "FunctionExpression";

  id: null;

  expression: boolean;

  generator: boolean;

  async: boolean;

  params: Array<Identifier>;

  body: BlockStatement;

  constructor(parser: Parser) {
    let isAsync = false;
    let isGenerator = false;

    if (parser.lookahead?.type === "Async") {
      parser.eat("Async");
      isAsync = true;
    }

    parser.eat("Function");

    if (parser.lookahead?.type === "*") {
      parser.eat("*");
      isGenerator = true;
    }

    parser.eat("(");

    const parameters: Array<Identifier> = [];

    do {
      parameters.push(new Identifier(parser));
    } while (parser.lookahead?.type === "," && parser.eat(","));

    parser.eat(")");

    const body = new BlockStatement(parser);

    this.type = "FunctionExpression";
    this.id = null;
    this.expression = false;
    this.generator = isGenerator;
    this.async = isAsync;
    this.params = parameters;
    this.body = body;
  }
}
