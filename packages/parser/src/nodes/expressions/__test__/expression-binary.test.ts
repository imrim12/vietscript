import { BinaryExpression } from "@parser/nodes/expressions/BinaryExpression";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";
import { Expression } from "../Expression";

describe("expression-binary.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse("xin chào === hello", Expression);

    expect(toPlainObject(result)).toStrictEqual({
      type: "BinaryExpression",
      operator: "===",
      left: {
        type: "Identifier",
        name: "_xin_ch224o",
      },
      right: {
        type: "Identifier",
        name: "_hello",
      },
    } as BinaryExpression);
  });
});
