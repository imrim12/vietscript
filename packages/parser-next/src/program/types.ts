import { Directive } from "@parser/directive/types";
import { Statement } from "@parser/statement/types";

export interface Program {
  type: "Program";
  body: [Directive | Statement];
}
