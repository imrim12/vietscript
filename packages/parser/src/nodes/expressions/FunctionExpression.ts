import { Parser } from "@parser/parser";
import { BlockStatement } from "@parser/nodes/statements/BlockStatement";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Keyword } from "@vietscript/shared";

export class FunctionExpression {
  type = "FunctionExpression";

  id: null;

  expression = false;

  generator = false;

  async = false;

  params: Array<Identifier> = [];

  body: BlockStatement;

  constructor(parser: Parser, ignoreFunctionKeyword = false) {
    if (parser.lookahead?.type === Keyword.ASYNC) {
      parser.eat(Keyword.ASYNC);
      this.async = true;
    }

    if (!ignoreFunctionKeyword) {
      parser.eat(Keyword.FUNCTION);
    }

    if (parser.lookahead?.type === "*") {
      parser.eat("*");
      this.generator = true;
    }

    parser.eat("(");

    const parameters: Array<Identifier> = [];

    while (parser.lookahead?.type !== ")") {
      if (parameters.length > 0) {
        parser.eat(",");
      }

      parameters.push(new Identifier(parser));
    }

    parser.eat(")");

    const body = new BlockStatement(parser);

    this.id = null;
    this.expression = false;
    this.params = parameters;
    this.body = body;
  }
}
