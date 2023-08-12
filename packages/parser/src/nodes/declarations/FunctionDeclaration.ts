import { Parser } from "@parser/parser";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { BlockStatement } from "@parser/nodes/statements/BlockStatement";
import { Keyword } from "@vietscript/shared";

export class FunctionDeclaration {
  type = "FunctionDeclaration";

  id: Identifier;

  expression: boolean;

  generator: boolean;

  async: boolean;

  params: Array<Identifier>;

  body: BlockStatement;

  constructor(parser: Parser) {
    let isAsync = false;
    let isGenerator = false;

    if (parser.lookahead?.type === Keyword.ASYNC) {
      parser.eat(Keyword.ASYNC);
      isAsync = true;
    }

    parser.eat(Keyword.FUNCTION);

    if (parser.lookahead?.type === "*") {
      parser.eat("*");
      isGenerator = true;
    }

    const name = String(new Identifier(parser).name);

    parser.eat("(");

    const parameters: Array<Identifier> = [];

    while (parser.lookahead?.type !== ")") {
      parameters.push(new Identifier(parser));

      if (parser.lookahead?.type !== ")") {
        parser.eat(",");
      }
    }

    parser.eat(")");

    const body = new BlockStatement(parser);

    this.id = {
      type: Keyword.IDENTIFIER,
      name,
    };
    this.expression = false;
    this.generator = isGenerator;
    this.async = isAsync;
    this.params = parameters;
    this.body = body;
  }
}
