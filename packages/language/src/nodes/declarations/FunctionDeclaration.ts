import { Parser } from "@lang/parser";
import { Identifier } from "@lang/nodes/identifier/Identifier";
import { BlockStatement } from "@lang/nodes/statements/BlockStatement";

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

    if (parser.lookahead?.type === "Async") {
      parser.eat("Async");
      isAsync = true;
    }

    parser.eat("Function");

    if (parser.lookahead?.type === "*") {
      parser.eat("*");
      isGenerator = true;
    }

    const name = String(parser.eat("Identifier").value);

    parser.eat("(");

    const parameters: Array<Identifier> = [];

    do {
      parameters.push(new Identifier(parser));
    } while (parser.lookahead?.type === "," && parser.eat(","));

    parser.eat(")");

    const body = new BlockStatement(parser);

    this.id = {
      type: "Identifier",
      name,
    };
    this.expression = false;
    this.generator = isGenerator;
    this.async = isAsync;
    this.params = parameters;
    this.body = body;
  }
}
