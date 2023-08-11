import { Parser } from "@lang/parser";
import { VariableDeclaration } from "@lang/nodes/declarations/VariableDeclaration";
import { Statement } from "@lang/nodes/statements/Statement";
import { BlockStatement } from "@lang/nodes/statements/BlockStatement";
import { Expression } from "@lang/nodes/expressions/Expression";
import { Identifier } from "@lang/nodes/identifier/Identifier";

// import { ForInOfStatement } from "./ForInOfStatement";

export class ForStatement {
  type = "ForStatement";

  init: VariableDeclaration | Identifier;

  test: Expression;

  update: Expression;

  body: Statement | BlockStatement;

  constructor(parser: Parser) {
    parser.eat("For");

    let isAsync = false;

    if (parser.lookahead?.type === "Await") {
      parser.eat("Await");
      isAsync = true;
    }

    parser.eat("(");

    if (!isAsync && parser.lookahead?.type !== "In" && parser.lookahead?.type !== "Of") {
      switch (parser.lookahead?.type) {
        case "Let":
        case "Var": {
          this.init = new VariableDeclaration(parser);
          break;
        }
        case "Const": {
          throw new Error("Const declarations are not allowed in for loops");
        }
        default: {
          // TODO: LexicalDeclaration instead of Identifier
          this.init = new Identifier(parser);
          break;
        }
      }

      parser.eat(";");

      this.test = new Expression(parser);

      if (parser.lookahead?.type === ";") {
        parser.eat(";");
      }

      if (parser.lookahead?.type !== ")") {
        this.update = new Expression(parser);
      }
    } else {
      // Contains only type, left and right as LeftHandSideExpression
      // Object.assign(this, new ForInOfStatement(parser, isAsync));
      throw new Error("For loop with in or of is not implemented");
    }

    parser.eat(")");

    this.body = parser.lookahead?.type === "{" ? new BlockStatement(parser) : new Statement(parser);
  }
}
