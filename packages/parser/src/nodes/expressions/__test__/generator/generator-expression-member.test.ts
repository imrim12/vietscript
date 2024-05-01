import generate from "@babel/generator";

import parser from "../../../../setup-test";
import { Expression } from "../../Expression";

describe("generator-expression-call.test", () => {
  it("should parse the syntax normally", () => {
    const code = `con chó.chân phải.móng chân.độ dài`;

    const ast = parser.parse(code, Expression);

    const result = generate(ast);

    expect(result.code).toBe(`_con_ch243._ch226n_ph7843i._m243ng_ch226n._2737897_d224i`);
  });

  it("should parse the syntax normally", () => {
    const code = `con chó[chân phải].móng chân.độ dài`;

    const ast = parser.parse(code, Expression);

    const result = generate(ast);

    expect(result.code).toBe(`_con_ch243[_ch226n_ph7843i]._m243ng_ch226n._2737897_d224i`);
  });

  it("should parse the syntax normally", () => {
    const code = `con chó.chân phải.móng chân.độ dài = 123`;

    const ast = parser.parse(code, Expression);

    const result = generate(ast);

    expect(result.code).toBe(`_con_ch243._ch226n_ph7843i._m243ng_ch226n._2737897_d224i = 123`);
  });
});
