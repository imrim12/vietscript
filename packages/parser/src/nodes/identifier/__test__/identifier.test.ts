import { ObjectExpression } from "@parser/nodes/expressions/ObjectExpression";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("identifier.test", () => {
  it("should parse long Vietnamese identifier without embedded keyword", () => {
    const result = parser.parse(
      `
    {
      Con mèo đen xinh đẹp chạy nhanh sân: "Giá trị pha ke"
    }
    `,
      ObjectExpression,
    );

    const plain = toPlainObject(result) as any;
    expect(plain.type).toBe("ObjectExpression");
    expect(plain.properties).toHaveLength(1);
    expect(plain.properties[0].type).toBe("ObjectProperty");
    expect(plain.properties[0].key.type).toBe("Identifier");
    expect(plain.properties[0].value.type).toBe("StringLiteral");
    expect(plain.properties[0].value.value).toBe("Giá trị pha ke");
  });
});
