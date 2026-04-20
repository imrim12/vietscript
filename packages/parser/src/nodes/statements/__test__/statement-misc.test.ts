import { Program } from "@parser/nodes/Program";
import { DebuggerStatement } from "@parser/nodes/statements/DebuggerStatement";
import { WithStatement } from "@parser/nodes/statements/WithStatement";
import { EmptyStatement } from "@parser/nodes/statements/EmptyStatement";

import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("statement-misc.test", () => {
  it("should parse debugger statement", () => {
    const result = parser.parse(`debugger`, DebuggerStatement);
    expect(toPlainObject(result)).toMatchObject({ type: "DebuggerStatement" });
  });

  it("should parse with statement (English)", () => {
    const result = parser.parse(`with (obj) {}`, WithStatement);
    expect(toPlainObject(result)).toMatchObject({
      type: "WithStatement",
      object: { type: "Identifier", name: "obj" },
      body: { type: "BlockStatement" },
    });
  });

  it("should parse empty statement", () => {
    const result = parser.parse(`;`, EmptyStatement);
    expect(toPlainObject(result)).toMatchObject({ type: "EmptyStatement" });
  });

  it("should parse multiple empty statements in program", () => {
    const result = parser.parse(`;;;`, Program);
    const plain = toPlainObject(result) as any;
    expect(plain.body.length).toBeGreaterThan(0);
  });

  it("should skip single-line comment", () => {
    const result = parser.parse(`// this is a comment\nhằng số x = 1`, Program);
    const plain = toPlainObject(result) as any;
    expect(plain.body).toHaveLength(1);
    expect(plain.body[0].type).toBe("VariableDeclaration");
  });

  it("should skip multi-line comment", () => {
    const result = parser.parse(`/* multi\nline\ncomment */\nhằng số x = 1`, Program);
    const plain = toPlainObject(result) as any;
    expect(plain.body).toHaveLength(1);
    expect(plain.body[0].type).toBe("VariableDeclaration");
  });
});
