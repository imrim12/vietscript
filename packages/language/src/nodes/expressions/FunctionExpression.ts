import { Parser } from "@lang/parser";

import { BlockStatement } from "../statements/BlockStatement";

export class FunctionExpression {
  node: {
    type: "FunctionExpression";
    id: null;
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
      type: "FunctionExpression",
      id: null,
      expression: false,
      generator: isGenerator,
      async: isAsync,
      params: parameters,
      body: body.node,
    };
  }
}
