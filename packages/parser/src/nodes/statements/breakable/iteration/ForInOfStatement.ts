import { Parser } from "@parser/parser";
import { VariableDeclaration } from "@parser/nodes/declarations/VariableDeclaration";
import { Identifier } from "@parser/nodes/identifier/Identifier";

export class ForInOfStatement {
  type: "ForInStatement" | "ForOfStatement";

  await: boolean;

  left: VariableDeclaration | Identifier;

  right: Identifier;

  constructor(parser: Parser, isAsync: boolean) {
    this.await = isAsync;
  }
}
