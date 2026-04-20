import { Expression } from "@parser/nodes/expressions/Expression";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("expression-tagged-template.test", () => {
  it("should parse simple tagged template", () => {
    const result = parser.parse("tag`hello`", Expression);
    expect(toPlainObject(result)).toMatchObject({
      type: "TaggedTemplateExpression",
      tag: { type: "Identifier", name: "tag" },
      quasi: {
        type: "TemplateLiteral",
        quasis: [{ value: { cooked: "hello" } }],
      },
    });
  });

  it("should parse tagged template with interpolation", () => {
    const result = parser.parse("html`<div>${name}</div>`", Expression);
    expect(toPlainObject(result)).toMatchObject({
      type: "TaggedTemplateExpression",
      tag: { type: "Identifier", name: "html" },
      quasi: {
        type: "TemplateLiteral",
        expressions: [{ type: "Identifier", name: "name" }],
      },
    });
  });
});
