import { Keyword } from "./keyword.enum";
import { Operator } from "./operator.type";

export type Spec = [RegExp, Keyword | Operator | null];
