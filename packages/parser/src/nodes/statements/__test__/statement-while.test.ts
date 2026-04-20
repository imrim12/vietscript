import { WhileStatement } from "@parser/nodes/statements/breakable/iteration/WhileStatement";
import { DoWhileStatement } from "@parser/nodes/statements/breakable/iteration/DoWhileStatement";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("statement-while.test", () => {
  it("should parse while with English keyword", () => {
    const result = parser.parse(`while (a < 10) { a++ }`, WhileStatement);
    expect(toPlainObject(result)).toMatchObject({
      type: "WhileStatement",
      test: { type: "BinaryExpression", operator: "<" },
      body: { type: "BlockStatement" },
    });
  });

  it("should parse while with Vietnamese keyword", () => {
    const result = parser.parse(`khi mà (a < 10) { a++ }`, WhileStatement);
    expect(toPlainObject(result)).toMatchObject({
      type: "WhileStatement",
    });
  });

  it("should parse do-while with English keyword", () => {
    const result = parser.parse(`do { a++ } while (a < 10)`, DoWhileStatement);
    expect(toPlainObject(result)).toMatchObject({
      type: "DoWhileStatement",
      test: { type: "BinaryExpression" },
      body: { type: "BlockStatement" },
    });
  });

  it("should parse do-while with Vietnamese keyword", () => {
    const result = parser.parse(`thực hiện { a++ } khi mà (a < 10)`, DoWhileStatement);
    expect(toPlainObject(result)).toMatchObject({
      type: "DoWhileStatement",
    });
  });
});
