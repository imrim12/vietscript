import { Program } from "@parser/nodes/Program";

import parser from "../setup-test";
import toPlainObject from "../toPlainObject";

describe("identifier-match-keyword.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(`khai báo một lớp gì đó = 1`, Program);

    expect(toPlainObject(result)).toStrictEqual({
      type: "Program",
      body: [
        {
          type: "VariableDeclaration",
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: "m7897t_l7899p_g236_273243",
              },
              init: {
                type: "NumericLiteral",
                value: 1,
                extra: {
                  rawValue: 1,
                  raw: "1",
                },
                start: 25,
                end: 26,
              },
            },
          ],
          kind: "var",
        },
      ],
    });
  });

  it("should show the syntax error", () => {
    expect(() => {
      parser.parse("khai báo lớp gì đó = 1", Program);
    }).toThrowError(/Unexpected token: "lớp", cannot use keyword "lớp" for the beginning of the identifer/);
  });
});
