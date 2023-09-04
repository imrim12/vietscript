import { Literal } from "@parser/literal/types";

export interface Directive {
  expression: Literal;
  directive: string;
}
