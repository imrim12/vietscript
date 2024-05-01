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
            name: "_Tr259m_n259m_trong_c245i_ng4327901i_ta_ch7919_t224i_ch7919_m7879nh_kh233o_l224_gh233t_nhau_Tr7843i_qua_m7897t_cu7897c_b7875_d226u_nh7919ng_273i7873u_tr244ng_th7845y_m224_273au_2737899n_l242ng_L7841_g236_b7881_s7855c_t432_phong_tr7901i_xanh_quen_v7899i_m225_h7891ng_273225nh_ghen",
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
