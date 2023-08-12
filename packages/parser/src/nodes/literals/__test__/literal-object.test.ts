import { ObjectLiteral } from "../ObjectLiteral";
import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("literal-object.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(
      `
		{
			số chân: 4,
			bất đồng bộ kêu(số lần, hmm) {
				trả về "Meo meo"
			}
		}
		`,
      ObjectLiteral,
    );

    expect(toPlainObject(result)).toStrictEqual({
      type: "ObjectLiteral",
      properties: [
        {
          type: "ObjectProperty",
          method: false,
          computed: false,
          key: {
            type: "Identifier",
            name: "số chân",
          },
          value: {
            type: "NumericLiteral",
            value: 4,
            extra: {
              rawValue: 4,
              raw: "4",
            },
            start: 17,
            end: 18,
          },
        },
        {
          type: "ObjectMethod",
          method: true,
          key: {
            type: "Identifier",
            name: "kêu",
          },
          computed: false,
          kind: "method",
          generator: false,
          async: true,
          params: [
            {
              type: "Identifier",
              name: "số lần",
            },
            {
              type: "Identifier",
              name: "hmm",
            },
          ],
          body: {
            type: "BlockStatement",
            body: [
              {
                type: "ReturnStatement",
                argument: {
                  type: "StringLiteral",
                  value: "Meo meo",
                  extra: {
                    rawValue: "Meo meo",
                    raw: '"Meo meo"',
                  },
                  start: 65,
                  end: 74,
                },
              },
            ],
          },
        },
      ],
    } as ObjectLiteral);
  });

  it("should parse the syntax normally", () => {
    const result = parser.parse(`{}`, ObjectLiteral);

    expect(toPlainObject(result)).toStrictEqual({
      type: "ObjectLiteral",
      properties: [],
    } as ObjectLiteral);
  });
});
