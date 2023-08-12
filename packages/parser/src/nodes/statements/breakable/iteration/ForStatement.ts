import { Parser } from "@parser/parser";
import { VariableDeclaration } from "@parser/nodes/declarations/VariableDeclaration";
import { Statement } from "@parser/nodes/statements/Statement";
import { BlockStatement } from "@parser/nodes/statements/BlockStatement";
import { Expression } from "@parser/nodes/expressions/Expression";
import { Identifier } from "@parser/nodes/identifier/Identifier";
import { Keyword } from "@vietscript/shared";

// import { ForInOfStatement } from "./ForInOfStatement";

export class ForStatement {
  type = "ForStatement";

  init: VariableDeclaration | Identifier;

  test: Expression;

  update: Expression;

  body: Statement | BlockStatement;

  constructor(parser: Parser) {
    parser.eat(Keyword.FOR);

    let isAsync = false;

    if (parser.lookahead?.type === Keyword.AWAIT) {
      parser.eat(Keyword.AWAIT);
      isAsync = true;
    }

    parser.eat("(");

    if (!isAsync && parser.lookahead?.type !== Keyword.IN && parser.lookahead?.type !== Keyword.OF) {
      switch (parser.lookahead?.type) {
        case Keyword.VAR:
        case Keyword.LET: {
          this.init = new VariableDeclaration(parser);
          break;
        }
        case Keyword.CONST: {
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
