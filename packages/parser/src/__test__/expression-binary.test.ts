import { BinaryExpression } from "@parser/nodes/expressions/BinaryExpression";

import parser from "./setup-test";
import toPlainObject from "./toPlainObject";

describe("expression-binary.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse("xin chào === hello", BinaryExpression);

    expect(toPlainObject(result)).toStrictEqual({
      type: "BinaryExpression",
      operator: "===",
      left: {
        type: "Identifier",
        name: "xin chào",
      },
      right: {
        type: "Identifier",
        name: "hello",
      },
    });
  });
});
