import { Parser } from "@lang/parser";
import { VariableDeclaration } from "@lang/nodes/declarations/VariableDeclaration";
import { Identifier } from "@lang/nodes/identifier/Identifier";

export class ForInOfStatement {
  type: "ForInStatement" | "ForOfStatement";

  await: boolean;

  left: VariableDeclaration | Identifier;

  right: Identifier;

  constructor(parser: Parser, isAsync: boolean) {
    this.await = isAsync;
  }
}
