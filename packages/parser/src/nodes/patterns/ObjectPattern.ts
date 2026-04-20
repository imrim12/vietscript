import { Parser } from "@parser/parser";

import { Expression } from "../expressions/Expression";
import { Identifier } from "../identifier/Identifier";

import { ArrayPattern } from "./ArrayPattern";

export interface PatternAssignment {
  type: "AssignmentPattern";
  left: Identifier | ObjectPattern | ArrayPattern;
  right: Expression;
}

export interface PatternRest {
  type: "RestElement";
  argument: Identifier;
}

export interface ObjectPatternProperty {
  type: "ObjectProperty";
  key: Identifier;
  value: Identifier | PatternAssignment | ObjectPattern | ArrayPattern;
  shorthand: boolean;
  computed: boolean;
}

export class ObjectPattern {
  type = "ObjectPattern";

  properties: Array<ObjectPatternProperty | PatternRest> = [];

  constructor(parser: Parser) {
    parser.eat("{");

    while (parser.lookahead?.type !== "}") {
      if (parser.lookahead?.type === "...") {
        parser.eat("...");
        const argument = new Identifier(parser);
        this.properties.push({ type: "RestElement", argument });

        if (parser.lookahead?.type !== "}") {
          throw new SyntaxError(`Rest element phải ở vị trí cuối trong object destructuring`);
        }
        break;
      }

      const key = new Identifier(parser);
      let value: Identifier | PatternAssignment | ObjectPattern | ArrayPattern = key;
      let shorthand = true;

      if (parser.lookahead?.type === ":") {
        parser.eat(":");
        const next = (parser.lookahead as { type: string } | null)?.type;
        if (next === "{") {
          value = new ObjectPattern(parser);
        } else if (next === "[") {
          value = new ArrayPattern(parser);
        } else {
          value = new Identifier(parser);
        }
        shorthand = false;
      }

      if (parser.lookahead?.type === "=") {
        parser.eat("=");
        const right = new Expression(parser);
        value = { type: "AssignmentPattern", left: value as Identifier | ObjectPattern, right };
      }

      this.properties.push({
        type: "ObjectProperty",
        key,
        value,
        shorthand,
        computed: false,
      });

      if (parser.lookahead?.type !== "}") {
        parser.eat(",");
      }
    }

    parser.eat("}");
  }
}
