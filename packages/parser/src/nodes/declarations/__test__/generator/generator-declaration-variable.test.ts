import generate from "@babel/generator";

import parser from "../../../../setup-test";
import { Declaration } from "../../Declaration";

describe("generator-expression-array.test", () => {
  it("should parse the syntax normally", () => {
    const code = `khai báo số một = 1`;

    const ast = parser.parse(code, Declaration);

    const result = generate(ast);

    expect(result.code).toBe(`var _s7889_m7897t = 1;`);
  });
});
