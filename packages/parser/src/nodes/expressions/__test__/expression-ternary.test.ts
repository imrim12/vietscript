import { Expression } from "@parser/nodes/expressions/Expression";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("expression-ternary.test", () => {
  it("should parse simple ternary", () => {
    const result = parser.parse(`c ? a : b`, Expression);
    expect(toPlainObject(result)).toMatchObject({
      type: "ConditionalExpression",
      test: { type: "Identifier", name: "c" },
      consequent: { type: "Identifier", name: "a" },
      alternate: { type: "Identifier", name: "b" },
    });
  });

  it("should parse ternary with literals", () => {
    const result = parser.parse(`x ? 1 : 2`, Expression);
    expect(toPlainObject(result)).toMatchObject({
      type: "ConditionalExpression",
    });
  });
});
