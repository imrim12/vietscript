export interface Location {
  line: number;
  column: number;
}

export function positionToLocation(source: string, offset: number): Location {
  let line = 1;
  let column = 1;
  for (let i = 0; i < offset && i < source.length; i++) {
    if (source[i] === "\n") {
      line++;
      column = 1;
    } else {
      column++;
    }
  }
  return { line, column };
}

export function formatSnippet(source: string, offset: number): string {
  const loc = positionToLocation(source, offset);
  const lines = source.split("\n");
  const lineIndex = loc.line - 1;

  const out: string[] = [];
  const pad = String(loc.line + 1).length;

  if (lineIndex - 1 >= 0) {
    out.push(`  ${String(lineIndex).padStart(pad)} | ${lines[lineIndex - 1]}`);
  }
  out.push(`> ${String(loc.line).padStart(pad)} | ${lines[lineIndex] ?? ""}`);
  out.push(`  ${" ".repeat(pad)} | ${" ".repeat(Math.max(0, loc.column - 1))}^`);
  if (lineIndex + 1 < lines.length) {
    out.push(`  ${String(loc.line + 1).padStart(pad)} | ${lines[lineIndex + 1]}`);
  }
  return out.join("\n");
}

export class VietScriptError extends Error {
  file?: string;
  line?: number;
  column?: number;
  snippet?: string;
  hint?: string;

  constructor(
    message: string,
    options: { file?: string; source?: string; offset?: number; hint?: string } = {},
  ) {
    super(message);
    this.name = "VietScriptError";
    this.file = options.file;
    this.hint = options.hint;

    if (options.source !== undefined && options.offset !== undefined) {
      const loc = positionToLocation(options.source, options.offset);
      this.line = loc.line;
      this.column = loc.column;
      this.snippet = formatSnippet(options.source, options.offset);
    }
  }

  format(): string {
    const parts: string[] = [];
    parts.push(`VietScriptError: ${this.message}`);
    if (this.file && this.line !== undefined) {
      parts.push(`  tại ${this.file}:${this.line}:${this.column}`);
    }
    if (this.snippet) {
      parts.push(this.snippet);
    }
    if (this.hint) {
      parts.push(`  gợi ý: ${this.hint}`);
    }
    return parts.join("\n");
  }
}
