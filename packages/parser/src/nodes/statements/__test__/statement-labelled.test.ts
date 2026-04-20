import { Program } from "@parser/nodes/Program";
import { BreakStatement } from "@parser/nodes/statements/BreakStatement";
import { ContinueStatement } from "@parser/nodes/statements/ContinueStatement";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("statement-labelled.test", () => {
  it("should parse labelled for loop", () => {
    const result = parser.parse(
      `outer: lặp (khai báo i = 0; i < 3; i++) {}`,
      Program,
    );

    expect(toPlainObject(result)).toMatchObject({
      type: "Program",
      body: [
        {
          type: "LabeledStatement",
          label: { type: "Identifier", name: "outer" },
          body: { type: "ForStatement" },
        },
      ],
    });
  });

  it("should parse break with label", () => {
    const result = parser.parse(`phá vòng lặp outer`, BreakStatement);

    expect(toPlainObject(result)).toMatchObject({
      type: "BreakStatement",
      label: { type: "Identifier", name: "outer" },
    });
  });

  it("should parse break without label", () => {
    const result = parser.parse(`phá vòng lặp`, BreakStatement);

    expect(toPlainObject(result)).toMatchObject({
      type: "BreakStatement",
      label: null,
    });
  });

  it("should parse continue with label", () => {
    const result = parser.parse(`tiếp tục outer`, ContinueStatement);

    expect(toPlainObject(result)).toMatchObject({
      type: "ContinueStatement",
      label: { type: "Identifier", name: "outer" },
    });
  });
});
