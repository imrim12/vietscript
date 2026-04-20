import generate from "@babel/generator";

import parser from "../../../../setup-test";
import { Expression } from "../../Expression";

describe("generator-expression-call.test", () => {
  it("should parse the syntax normally", () => {
    const code = `con chó.chân phải.móng chân.độ dài`;

    const ast = parser.parse(code, Expression);

    const result = generate(ast);

    expect(result.code).toBe(`con_chó.chân_phải.móng_chân.độ_dài`);
  });

  it("should parse the syntax normally", () => {
    const code = `con chó[chân phải].móng chân.độ dài`;

    const ast = parser.parse(code, Expression);

    const result = generate(ast);

    expect(result.code).toBe(`con_chó[chân_phải].móng_chân.độ_dài`);
  });

  it("should parse the syntax normally", () => {
    const code = `con chó.chân phải.móng chân.độ dài = 123`;

    const ast = parser.parse(code, Expression);

    const result = generate(ast);

    expect(result.code).toBe(`con_chó.chân_phải.móng_chân.độ_dài = 123`);
  });
});
