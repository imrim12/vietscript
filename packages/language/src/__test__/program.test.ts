import { Program } from "@lang/nodes/Program";

import parser from "./setup-test";

describe("program.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(
      `khai báo tuổi = 25;;;
		khai báo tên = "Tú Nguyễn";;`,
      Program,
    );

    expect(result.node).toStrictEqual({
      type: "Program",
      body: [
        {
          type: "VariableDeclaration",
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: "tuổi",
              },
              init: {
                type: "Literal",
                value: 25,
                raw: "25",
              },
            },
          ],
          kind: "var",
        },
        {
          type: "EmptyStatement",
        },
        {
          type: "EmptyStatement",
        },
        {
          type: "VariableDeclaration",
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: "tên",
              },
              init: {
                type: "Literal",
                value: "Tú Nguyễn",
                raw: '"Tú Nguyễn"',
              },
            },
          ],
          kind: "var",
        },
        {
          type: "EmptyStatement",
        },
      ],
    });
  });
});
