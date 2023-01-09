import { BooleanLiteral } from "@lang/nodes/literals/BooleanLiteral";

import parser from "./setup-test";

describe("program", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse("true", BooleanLiteral);

    expect(result.node).toStrictEqual({
      type: "BooleanLiteral",
      value: true,
      raw: "true",
    });
  });
});
