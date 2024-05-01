import generate from "@babel/generator";

import parser from "../../../../setup-test";
import { Expression } from "../../Expression";

describe("generator-expression-call.test", () => {
  it("should parse the syntax normally", () => {
    const code = `con chó.kêu()`;

    const ast = parser.parse(code, Expression);

    const result = generate(ast);

    expect(result.code).toBe(`_con_ch243._k234u()`);
  });

  it("should parse the syntax normally", () => {
    const code = `con chó.chân phải.đá()`;

    const ast = parser.parse(code, Expression);

    const result = generate(ast);

    expect(result.code).toBe(`_con_ch243._ch226n_ph7843i._273225()`);
  });

  it("should parse the syntax normally", () => {
    const code = `con chó[chân].đá()`;

    const ast = parser.parse(code, Expression);

    const result = generate(ast);

    expect(result.code).toBe(`_con_ch243[_ch226n]._273225()`);
  });
});
