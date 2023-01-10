import { Parser } from "@lang/parser";

import { BlockStatement } from "../statements/BlockStatement";

export class FunctionDeclaration {
  type: "FunctionDeclaration";

  id: {
    type: "Identifier";
    name: string;
  };

  expression: boolean;

  generator: boolean;

  async: boolean;

  params: Array<{
    type: "Identifier";
    name: string;
  }>;

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

    const parameters: Array<{
      type: "Identifier";
      name: string;
    }> = [];

    do {
      parameters.push({
        type: "Identifier",
        name: String(parser.eat("Identifier").value),
      });
    } while (parser.lookahead?.type === "," && parser.eat(","));

    parser.eat(")");

    const body = new BlockStatement(parser);

    this.type = "FunctionDeclaration";
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
