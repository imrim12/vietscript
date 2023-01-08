import parser from "@lang";

describe("program", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(`["Hello"]`);

    expect(result.node).toStrictEqual({
      type: "Program",
      body: [
        {
          type: "ArrayExpression",
          elements: ["Hello"],
        },
      ],
    });
  });
});
