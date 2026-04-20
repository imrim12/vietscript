import { Parser } from "@parser/parser";

import { Expression } from "../expressions/Expression";
import { Identifier } from "../identifier/Identifier";
import { ObjectPattern } from "../patterns/ObjectPattern";
import { ArrayPattern } from "../patterns/ArrayPattern";

export interface AssignmentPattern {
  type: "AssignmentPattern";
  left: Identifier | ObjectPattern | ArrayPattern;
  right: Expression;
}

export interface RestElement {
  type: "RestElement";
  argument: Identifier | ObjectPattern | ArrayPattern;
}

export type Parameter = Identifier | ObjectPattern | ArrayPattern | AssignmentPattern | RestElement;

export class ParameterList {
  parameters: Array<Parameter> = [];

  constructor(parser: Parser, stopToken = ")") {
    while (parser.lookahead?.type !== stopToken) {
      if (parser.lookahead?.type === "...") {
        parser.eat("...");
        const argument = parseBindingTarget(parser);
        this.parameters.push({ type: "RestElement", argument });

        if (parser.lookahead?.type !== stopToken) {
          throw new SyntaxError(`Rest parameter phải ở vị trí cuối, không được theo sau bởi tham số khác`);
        }
        break;
      }

      const left = parseBindingTarget(parser);

      if (parser.lookahead?.type === "=") {
        parser.eat("=");
        const right = new Expression(parser);
        this.parameters.push({
          type: "AssignmentPattern",
          left,
          right,
        });
      } else {
        this.parameters.push(left);
      }

      if (parser.lookahead?.type !== stopToken) {
        parser.eat(",");
      }
    }
  }
}

function parseBindingTarget(parser: Parser): Identifier | ObjectPattern | ArrayPattern {
  if (parser.lookahead?.type === "{") return new ObjectPattern(parser);
  if (parser.lookahead?.type === "[") return new ArrayPattern(parser);
  return new Identifier(parser);
}
