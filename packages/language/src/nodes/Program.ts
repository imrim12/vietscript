import { Parser } from "@lang/parser";

import { ArrayExpression } from "./expressions/ArrayExpression";
import { BaseAtsNode } from "./BaseAtsNode";

export class Program extends BaseAtsNode<Array<any>> {
  constructor(parser: Parser) {
    super();
    const stringList = new ArrayExpression(parser);

    this.value = stringList.value;
    this.node = {
      type: "Program",
      body: [stringList.node],
    };
  }
}
