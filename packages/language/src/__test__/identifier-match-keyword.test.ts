import { Program } from "@lang/nodes/Program";

import parser from "./setup-test";
import toPlainObject from "./toPlainObject";

describe("identifier-match-keyword.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(`khai báo lớp gì đó = 1`, Program);

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
                name: "lớp gì đó",
              },
              init: {
                type: "Literal",
                value: 1,
                raw: "1",
              },
            },
          ],
          kind: "var",
        },
      ],
    });
  });
});
