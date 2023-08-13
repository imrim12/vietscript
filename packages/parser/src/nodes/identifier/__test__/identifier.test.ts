// Trăm năm trong cõi người ta, chữ tài chữ mệnh khéo là ghét nhau. Trải qua một cuộc bể dâu, những điều trông thấy mà đau đớn lòng. Lạ gì bỉ sắc tư phong, trời xanh quen với má hồng đánh ghen.
import { ObjectLiteral } from "@parser/nodes/literals/ObjectLiteral";

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
            name: "Trăm năm trong cõi người ta chữ tài chữ mệnh khéo là ghét nhau Trải qua một cuộc bể dâu những điều trông thấy mà đau đớn lòng Lạ gì bỉ sắc tư phong trời xanh quen với má hồng đánh ghen",
          },
          value: {
            type: "StringLiteral",
            value: "Giá trị pha ke",
            extra: {
              rawValue: "Giá trị pha ke",
              raw: '"Giá trị pha ke"',
            },
            start: 265,
            end: 281,
          },
        },
      ],
    } as ObjectLiteral);
  });
});
