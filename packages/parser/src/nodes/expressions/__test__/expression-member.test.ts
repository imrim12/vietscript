import { Expression } from "@parser/nodes/expressions/Expression";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";
import { MemberExpression } from "../MemberExpression";
import { AssignmentExpression } from "../AssignmentExpression";

describe("expression-member.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse("con chó.chân phải.móng chân.độ dài", Expression);

    expect(toPlainObject(result)).toStrictEqual({
      type: "MemberExpression",
      object: {
        type: "MemberExpression",
        object: {
          type: "MemberExpression",
          object: {
            type: "Identifier",
            name: "con_ch243",
          },
          property: {
            type: "Identifier",
            name: "ch226n_ph7843i",
          },
          computed: false,
          optional: false,
        },
        property: {
          type: "Identifier",
          name: "m243ng_ch226n",
        },
        computed: false,
        optional: false,
      },
      property: {
        type: "Identifier",
        name: "2737897_d224i",
      },
      computed: false,
      optional: false,
    } as MemberExpression);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("con chó[chân phải].móng chân.độ dài", Expression);

    expect(toPlainObject(result)).toStrictEqual({
      type: "MemberExpression",
      object: {
        type: "MemberExpression",
        object: {
          type: "MemberExpression",
          object: {
            type: "Identifier",
            name: "con_ch243",
          },
          property: {
            type: "Identifier",
            name: "ch226n_ph7843i",
          },
          computed: true,
          optional: false,
        },
        property: {
          type: "Identifier",
          name: "m243ng_ch226n",
        },
        computed: false,
        optional: false,
      },
      property: {
        type: "Identifier",
        name: "2737897_d224i",
      },
      computed: false,
      optional: false,
    } as MemberExpression);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse("con chó.chân phải.móng chân.độ dài = 123", Expression);

    expect(toPlainObject(result)).toStrictEqual({
      type: "AssignmentExpression",
      left: {
        type: "MemberExpression",
        object: {
          type: "MemberExpression",
          object: {
            type: "MemberExpression",
            object: {
              type: "Identifier",
              name: "con_ch243",
            },
            property: {
              type: "Identifier",
              name: "ch226n_ph7843i",
            },
            computed: false,
            optional: false,
          },
          property: {
            type: "Identifier",
            name: "m243ng_ch226n",
          },
          computed: false,
          optional: false,
        },
        property: {
          type: "Identifier",
          name: "2737897_d224i",
        },
        computed: false,
        optional: false,
      },
      operator: "=",
      right: {
        type: "NumericLiteral",
        value: 123,
        extra: {
          rawValue: 123,
          raw: "123",
        },
        start: 37,
        end: 40,
      },
    } as AssignmentExpression);
  });
});
