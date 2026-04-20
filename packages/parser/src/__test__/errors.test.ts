import { VietScriptError, positionToLocation, formatSnippet } from "@parser/errors";

describe("errors.test", () => {
  describe("positionToLocation", () => {
    it("should return line 1 col 1 for offset 0", () => {
      expect(positionToLocation("abc", 0)).toEqual({ line: 1, column: 1 });
    });

    it("should count newlines", () => {
      expect(positionToLocation("abc\ndef", 4)).toEqual({ line: 2, column: 1 });
    });

    it("should count columns within a line", () => {
      expect(positionToLocation("abc\ndef", 6)).toEqual({ line: 2, column: 3 });
    });

    it("should clamp offset beyond source length", () => {
      const loc = positionToLocation("ab", 100);
      expect(loc.line).toBe(1);
      expect(loc.column).toBeGreaterThan(1);
    });
  });

  describe("formatSnippet", () => {
    it("should show source line with caret", () => {
      const snippet = formatSnippet("line1\nline2\nline3", 6);
      expect(snippet).toContain("> 2 | line2");
      expect(snippet).toContain("^");
    });

    it("should include context lines above/below", () => {
      const snippet = formatSnippet("a\nb\nc\nd", 2);
      expect(snippet).toContain("1 | a");
      expect(snippet).toContain("> 2 | b");
      expect(snippet).toContain("3 | c");
    });
  });

  describe("VietScriptError", () => {
    it("should format basic error", () => {
      const err = new VietScriptError("lỗi gì đó");
      expect(err.format()).toContain("VietScriptError: lỗi gì đó");
    });

    it("should include file:line:col", () => {
      const err = new VietScriptError("msg", {
        file: "test.vjs",
        source: "abc\ndef",
        offset: 4,
      });
      expect(err.format()).toContain("tại test.vjs:2:1");
    });

    it("should include snippet", () => {
      const err = new VietScriptError("msg", {
        source: "line1\nbad\nline3",
        offset: 6,
      });
      expect(err.format()).toContain("> 2 | bad");
    });

    it("should include hint when provided", () => {
      const err = new VietScriptError("msg", {
        hint: "thử cách khác",
      });
      expect(err.format()).toContain("gợi ý: thử cách khác");
    });

    it("should be instanceof Error", () => {
      const err = new VietScriptError("x");
      expect(err instanceof Error).toBe(true);
    });
  });
});
