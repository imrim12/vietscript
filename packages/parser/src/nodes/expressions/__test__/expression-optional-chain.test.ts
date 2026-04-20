import { Expression } from "@parser/nodes/expressions/Expression";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("expression-optional-chain.test", () => {
  it("should parse optional member access", () => {
    const result = parser.parse(`a?.b`, Expression);

    expect(toPlainObject(result)).toMatchObject({
      type: "OptionalMemberExpression",
      optional: true,
      computed: false,
      object: { type: "Identifier", name: "a" },
      property: { type: "Identifier", name: "b" },
    });
  });

  it("should parse optional computed access", () => {
    const result = parser.parse(`a?.[k]`, Expression);

    expect(toPlainObject(result)).toMatchObject({
      type: "OptionalMemberExpression",
      optional: true,
      computed: true,
      property: { type: "Identifier", name: "k" },
    });
  });

  it("should parse chained optional", () => {
    const result = parser.parse(`a?.b?.c`, Expression);

    expect(toPlainObject(result)).toMatchObject({
      type: "OptionalMemberExpression",
    });
  });

  it("should parse mixed regular and optional", () => {
    const result = parser.parse(`a.b?.c`, Expression);

    expect(toPlainObject(result)).toMatchObject({
      type: "OptionalMemberExpression",
    });
  });
});
