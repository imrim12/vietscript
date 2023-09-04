import { Expression } from "@parser/expression/types";

export interface Literal extends Expression {
  type: "Literal";
  value: string | boolean | null | number | RegExp;
}

export interface RegExpLiteral extends Literal {
  regex: {
    pattern: string;
    flags: string;
  };
}
