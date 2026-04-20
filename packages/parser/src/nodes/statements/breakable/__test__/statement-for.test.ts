import { ForStatement } from "@parser/nodes/statements/breakable/iteration/ForStatement";

import parser from "../../../../setup-test";
import toPlainObject from "../../../../toPlainObject";

describe("statement-for.test", () => {
  it("should parse traditional for loop", () => {
    const result = parser.parse(`lặp (khai báo i = 0; i < 10; i++) {}`, ForStatement);

    expect(toPlainObject(result)).toMatchObject({
      type: "ForStatement",
      init: { type: "VariableDeclaration" },
      body: { type: "BlockStatement" },
    });
  });

  it("should parse for-of with let", () => {
    const result = parser.parse(`lặp (biến x của arr) {}`, ForStatement);

    expect(toPlainObject(result)).toMatchObject({
      type: "ForOfStatement",
      await: false,
      left: {
        type: "VariableDeclaration",
        kind: "let",
      },
      right: { type: "Identifier", name: "arr" },
    });
  });

  it("should parse for-in with let", () => {
    const result = parser.parse(`lặp (biến k trong obj) {}`, ForStatement);

    expect(toPlainObject(result)).toMatchObject({
      type: "ForInStatement",
      left: {
        type: "VariableDeclaration",
        kind: "let",
      },
      right: { type: "Identifier", name: "obj" },
    });
  });

  it("should parse for-of with destructuring", () => {
    const result = parser.parse(`lặp (hằng số { a } của arr) {}`, ForStatement);

    expect(toPlainObject(result)).toMatchObject({
      type: "ForOfStatement",
      left: {
        type: "VariableDeclaration",
        declarations: [
          {
            id: { type: "ObjectPattern" },
          },
        ],
      },
    });
  });

  it("should parse for-await-of", () => {
    const result = parser.parse(`lặp chờ (biến x của arr) {}`, ForStatement);

    expect(toPlainObject(result)).toMatchObject({
      type: "ForOfStatement",
      await: true,
    });
  });
});
