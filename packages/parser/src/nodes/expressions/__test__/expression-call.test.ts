import { Expression } from "@parser/nodes/expressions/Expression";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";
import { CallExpression } from "../CallExpression";

describe("expression-call.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse("con chó.kêu()", Expression);

    expect(toPlainObject(result)).toStrictEqual({
      type: "CallExpression",
      arguments: [],
      optional: false,
      callee: {
        type: "MemberExpression",
        object: {
          type: "Identifier",
          name: "_con_ch243",
        },
        property: {
          type: "Identifier",
          name: "_k234u",
        },
        computed: false,
        optional: false,
      },
    } as CallExpression);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("con chó.chân phải.đá()", Expression);

    expect(toPlainObject(result)).toStrictEqual({
      type: "CallExpression",
      arguments: [],
      optional: false,
      callee: {
        type: "MemberExpression",
        object: {
          type: "MemberExpression",
          object: {
            type: "Identifier",
            name: "_con_ch243",
          },
          property: {
            type: "Identifier",
            name: "_ch226n_ph7843i",
          },
          computed: false,
          optional: false,
        },
        property: {
          type: "Identifier",
          name: "_273225",
        },
        computed: false,
        optional: false,
      },
    } as CallExpression);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("con chó[chân].đá()", Expression);

    expect(toPlainObject(result)).toStrictEqual({
      type: "CallExpression",
      arguments: [],
      optional: false,
      callee: {
        type: "MemberExpression",
        object: {
          type: "MemberExpression",
          object: {
            type: "Identifier",
            name: "_con_ch243",
          },
          property: {
            type: "Identifier",
            name: "_ch226n",
          },
          computed: true,
          optional: false,
        },
        property: {
          type: "Identifier",
          name: "_273225",
        },
        computed: false,
        optional: false,
      },
    } as CallExpression);
  });
});
