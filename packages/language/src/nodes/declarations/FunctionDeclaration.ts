import { Parser } from "@lang/parser";

import { BlockStatement } from "../statements/BlockStatement";

export class FunctionDeclaration {
  node: {
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
    body: BlockStatement["node"];
  };

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

    this.node = {
      type: "FunctionDeclaration",
      id: {
        type: "Identifier",
        name,
      },
      expression: false,
      generator: isGenerator,
      async: isAsync,
      params: parameters,
      body: body.node,
    };
  }
}
