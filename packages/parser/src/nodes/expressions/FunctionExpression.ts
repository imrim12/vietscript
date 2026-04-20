import { Parser } from "@parser/parser";
import { BlockStatement } from "@parser/nodes/statements/BlockStatement";
import { ParameterList, Parameter } from "@parser/nodes/declarations/ParameterList";
import { Keyword } from "@vietscript/shared";

export class FunctionExpression {
  type = "FunctionExpression";

  id: null;

  expression = false;

  generator = false;

  async = false;

  params: Array<Parameter> = [];

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

    this.params = new ParameterList(parser, ")").parameters;

    parser.eat(")");

    this.body = new BlockStatement(parser);
    this.id = null;
  }
}
