import { Parser } from "@parser/parser";
import { BlockStatement } from "@parser/nodes/statements/BlockStatement";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Keyword } from "@vietscript/shared";

export class FunctionExpression {
  type = "FunctionExpression";

  id: null;

  expression: boolean;

  generator: boolean;

  async: boolean;

  params: Array<Identifier>;

  body: BlockStatement;

  constructor(parser: Parser, ignoreKeyword = false, isDefaultAsync = false) {
    let isAsync = isDefaultAsync;
    let isGenerator = false;

    if (parser.lookahead?.type === Keyword.ASYNC && !isDefaultAsync) {
      parser.eat(Keyword.ASYNC);
      isAsync = true;
    }

    if (!ignoreKeyword) {
      parser.eat(Keyword.FUNCTION);
    }

    if (parser.lookahead?.type === "*") {
      parser.eat("*");
      isGenerator = true;
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
    this.generator = isGenerator;
    this.async = isAsync;
    this.params = parameters;
    this.body = body;
  }
}
