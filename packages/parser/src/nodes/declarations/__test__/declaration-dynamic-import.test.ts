import { Program } from "@parser/nodes/Program";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("declaration-dynamic-import.test", () => {
  it("should parse dynamic import with string literal", () => {
    const result = parser.parse(`sử dụng("./module")`, Program);
    const plain = toPlainObject(result) as any;
    expect(plain.body[0]).toMatchObject({
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: { type: "Import" },
        arguments: [{ type: "StringLiteral", value: "./module" }],
      },
    });
  });

  it("should parse dynamic import with English keyword", () => {
    const result = parser.parse(`import("./module")`, Program);
    const plain = toPlainObject(result) as any;
    expect(plain.body[0]).toMatchObject({
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: { type: "Import" },
      },
    });
  });

  it("should still parse static import normally", () => {
    const result = parser.parse(`sử dụng { foo } từ "./bar"`, Program);
    const plain = toPlainObject(result) as any;
    expect(plain.body[0].type).toBe("ImportDeclaration");
  });
});
