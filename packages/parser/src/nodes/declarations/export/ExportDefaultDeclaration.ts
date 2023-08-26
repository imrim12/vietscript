import { Keyword } from "@vietscript/shared";
import { Parser } from "@parser/parser";
import { Expression } from "@parser/nodes/expressions/Expression";

export class ExportDefaultDeclaration {
  type = "ExportDefaultDeclaration";

  declaration: Expression;

  constructor(parser: Parser) {
    parser.eat(Keyword.DEFAULT);

    this.declaration = new Expression(parser);
  }
}
