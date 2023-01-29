import { Expression } from "@lang/nodes/expressions/Expression";

import parser from "./setup-test";
import toPlainObject from "./toPlainObject";

describe("expression-member.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse("a.b.c.d", Expression);

    expect(toPlainObject(result)).toStrictEqual({
      type: "MemberExpression",
      object: {
        type: "MemberExpression",
        object: {
          type: "MemberExpression",
          object: {
            type: "Identifier",
            name: "a",
          },
          property: {
            type: "Identifier",
            name: "b",
          },
          computed: false,
          optional: false,
        },
        property: {
          type: "Identifier",
          name: "c",
        },
        computed: false,
        optional: false,
      },
      property: {
        type: "Identifier",
        name: "d",
      },
      computed: false,
      optional: false,
    });
  });
});
