import { ObjectExpression } from "@parser/nodes/expressions/ObjectExpression";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("identifier.test", () => {
  it("should parse the syntax normally", () => {
    const result = parser.parse(
      `
    {
      // Object này có key siêu dài và câu này cũng có khá đa dạng về ký tự để test việc parse identifier
      Trăm năm trong cõi người ta chữ tài chữ mệnh khéo là ghét nhau Trải qua một cuộc bể dâu những điều trông thấy mà đau đớn lòng Lạ gì bỉ sắc tư phong trời xanh quen với má hồng đánh ghen: "Giá trị pha ke"
    }
    `,
      ObjectExpression,
    );

    expect(toPlainObject(result)).toStrictEqual({
      type: "ObjectExpression",
      properties: [
        {
          type: "ObjectProperty",
          method: false,
          computed: false,
          key: {
            type: "Identifier",
            name: "Trăm năm trong cõi người ta chữ tài chữ mệnh khéo là ghét nhau Trải qua một cuộc bể dâu những điều trông thấy mà đau đớn lòng Lạ gì bỉ sắc tư phong trời xanh quen với má hồng đánh ghen",
          },
          value: {
            type: "StringLiteral",
            value: "Giá trị pha ke",
            extra: {
              rawValue: "Giá trị pha ke",
              raw: '"Giá trị pha ke"',
            },
            start: 305,
            end: 321,
          },
        },
      ],
    } as ObjectExpression);
  });
});
