import { Program } from "@parser/nodes/Program";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("statement-all.test", () => {
  it("should parse throw", () => {
    const result = parser.parse(`báo lỗi new Error("x")`, Program);
    const plain = toPlainObject(result) as any;
    expect(plain.body[0].type).toBe("ThrowStatement");
  });

  it("should parse return", () => {
    const result = parser.parse(`hàm f() { trả về 42 }`, Program);
    const plain = toPlainObject(result) as any;
    expect(plain.body[0].body.body[0].type).toBe("ReturnStatement");
  });

  it("should parse return no arg", () => {
    const result = parser.parse(`hàm f() { trả về }`, Program);
    const plain = toPlainObject(result) as any;
    expect(plain.body[0].body.body[0].type).toBe("ReturnStatement");
  });

  it("should parse break", () => {
    const result = parser.parse(`lặp (biến i = 0; i < 10; i++) { phá vòng lặp }`, Program);
    const plain = toPlainObject(result) as any;
    expect(plain.body[0].body.body[0].type).toBe("BreakStatement");
  });

  it("should parse continue", () => {
    const result = parser.parse(`lặp (biến i = 0; i < 10; i++) { tiếp tục }`, Program);
    const plain = toPlainObject(result) as any;
    expect(plain.body[0].body.body[0].type).toBe("ContinueStatement");
  });

  it("should parse nested blocks", () => {
    const result = parser.parse(`{ { hằng số x = 1 } }`, Program);
    const plain = toPlainObject(result) as any;
    expect(plain.body[0].type).toBe("BlockStatement");
    expect(plain.body[0].body[0].type).toBe("BlockStatement");
  });
});
