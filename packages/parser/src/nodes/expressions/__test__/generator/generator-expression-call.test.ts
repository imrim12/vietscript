import generate from "@babel/generator";

import parser from "../../../../setup-test";
import { Expression } from "../../Expression";

describe("generator-expression-call.test", () => {
  it("should parse the syntax normally", () => {
    const code = `con chó.kêu()`;

    const ast = parser.parse(code, Expression);

    const result = generate(ast);

    expect(result.code).toBe(`con_ch243.k234u()`);
  });

  it("should parse the syntax normally", () => {
    const code = `con chó.chân phải.đá()`;

    const ast = parser.parse(code, Expression);

    const result = generate(ast);

    expect(result.code).toBe(`con_ch243.ch226n_ph7843i.273225()`);
  });

  it("should parse the syntax normally", () => {
    const code = `con chó[chân].đá()`;

    const ast = parser.parse(code, Expression);

    const result = generate(ast);

    expect(result.code).toBe(`con_ch243[ch226n].273225()`);
  });
});
