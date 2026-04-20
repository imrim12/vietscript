import { Expression } from "@parser/nodes/expressions/Expression";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("expression-chain.test", () => {
  it("should parse method chain after array literal", () => {
    const result = parser.parse(`[1, 2, 3].map(x => x * 2)`, Expression);
    expect(toPlainObject(result)).toMatchObject({
      type: "CallExpression",
    });
  });

  it("should parse method chain after object literal via statement context", () => {
    const result = parser.parse(`{ a: 1 }`, Expression);
    expect(toPlainObject(result)).toMatchObject({
      type: "ObjectExpression",
    });
  });

  it("should parse logical chain", () => {
    const result = parser.parse(`a ?? b ?? c`, Expression);
    expect(toPlainObject(result)).toMatchObject({
      type: "LogicalExpression",
    });
  });

  it("should parse optional chain with logical", () => {
    const result = parser.parse(`obj?.prop ?? "default"`, Expression);
    const plain = toPlainObject(result) as any;
    expect(plain.type).toBe("LogicalExpression");
    expect(plain.operator).toBe("??");
  });

  it("should parse call followed by member access", () => {
    const result = parser.parse(`foo().bar`, Expression);
    expect(toPlainObject(result)).toMatchObject({
      type: "MemberExpression",
    });
  });

  it("should parse call chain", () => {
    const result = parser.parse(`foo().bar()`, Expression);
    expect(toPlainObject(result)).toMatchObject({
      type: "CallExpression",
    });
  });
});
