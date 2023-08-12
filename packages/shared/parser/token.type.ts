import { Keyword } from "./keyword.enum";
import { Operator } from "./operator.type";

export type Token = {
  type: Keyword | Operator | null;
  value: string | number;
  start: number;
  end: number;
};
