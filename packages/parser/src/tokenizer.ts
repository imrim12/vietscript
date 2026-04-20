import { Keyword, Token } from "@vietscript/shared";

import { Specs } from "./constants/specs";
import { Parser } from "./parser";

const REGEX_PRECEDING_TOKENS = new Set<string>([
  "(",
  "[",
  "{",
  ",",
  ";",
  ":",
  "=",
  "!",
  "?",
  "+",
  "-",
  "*",
  "/",
  "%",
  "&&",
  "||",
  "??",
  "=>",
  "==",
  "===",
  "!=",
  "!==",
  "<",
  ">",
  "<=",
  ">=",
  "&",
  "|",
  "^",
  "~",
  "<<",
  ">>",
  ">>>",
  "+=",
  "-=",
  "*=",
  "/=",
  "%=",
  "**=",
  "&=",
  "|=",
  "^=",
  "<<=",
  ">>=",
  ">>>=",
  "&&=",
  "||=",
  "??=",
  "...",
  Keyword.RETURN,
  Keyword.YIELD,
  Keyword.AWAIT,
  Keyword.TYPEOF,
  Keyword.VOID,
  Keyword.DELETE,
  Keyword.NEW,
  Keyword.THROW,
  Keyword.IN,
  Keyword.OF,
  Keyword.INSTANCEOF,
  Keyword.CASE,
  Keyword.DEFAULT,
]);

export class Tokenizer {
  private parser: Parser;

  private cursor: number;

  private lastTokenType: string | null = null;

  constructor(parser: Parser) {
    this.parser = parser;
    this.cursor = 0;
  }

  public rollback(step: number) {
    if (this.parser.lookahead) this.parser.lookahead.end -= step;

    this.cursor -= step;

    return this.cursor;
  }

  public isEOF() {
    return this.cursor === this.parser.syntax.length;
  }

  protected hasMoreTokens() {
    return this.cursor < this.parser.syntax.length;
  }

  public getNextToken(): Token | null {
    if (!this.hasMoreTokens()) {
      return null;
    }

    const whitespaceMatch = /^\s+/.exec(this.parser.syntax.slice(this.cursor));
    if (whitespaceMatch) {
      this.cursor += whitespaceMatch[0].length;
      return this.getNextToken();
    }

    const string = this.parser.syntax.slice(this.cursor);

    if (string[0] === "`") {
      const tok = this.scanTemplateLiteral();
      this.lastTokenType = tok.type as string;
      return tok;
    }

    if (string[0] === "/" && string[1] !== "/" && string[1] !== "*" && this.isRegexExpected()) {
      const tok = this.scanRegexLiteral();
      if (tok) {
        this.lastTokenType = tok.type as string;
        return tok;
      }
    }

    for (const [regexp, tokenType] of Specs) {
      const tokenValue = this.match(regexp, string);

      if (tokenValue === null) {
        continue;
      }

      if (tokenType === null) {
        return this.getNextToken();
      }

      if (tokenType === Keyword.IDENTIFIER && tokenValue.includes(" ")) {
        const truncated = this.truncateBeforeEmbeddedKeyword(tokenValue);
        if (truncated.length !== tokenValue.length) {
          this.cursor -= tokenValue.length - truncated.length;
          this.lastTokenType = tokenType as string;
          return {
            type: tokenType,
            value: truncated,
            start: this.cursor - truncated.length,
            end: this.cursor,
          };
        }
      }

      this.lastTokenType = tokenType as string;
      return {
        type: tokenType,
        value: tokenValue,
        start: this.cursor - String(tokenValue).length,
        end: this.cursor,
      };
    }

    throw new SyntaxError(`Unexpected token: "${string[0]}"`);
  }

  private isRegexExpected(): boolean {
    if (this.lastTokenType === null) return true;
    return REGEX_PRECEDING_TOKENS.has(this.lastTokenType);
  }

  private truncateBeforeEmbeddedKeyword(value: string): string {
    const words = value.split(/\s+/);
    let truncated = words[0];
    for (let i = 1; i < words.length; i++) {
      const rest = words.slice(i).join(" ");
      for (const [regexp, tokenType] of Specs) {
        if (tokenType === null || tokenType === Keyword.IDENTIFIER) continue;
        const m = regexp.exec(rest + ";");
        if (m && m.index === 0 && /^[A-Za-z\u00C0-\u1EF9]/.test(m[0])) {
          return truncated;
        }
      }
      truncated += " " + words[i];
    }
    return value;
  }

  private scanRegexLiteral(): Token | null {
    const source = this.parser.syntax;
    const start = this.cursor;
    let i = start + 1;
    let inCharClass = false;

    while (i < source.length) {
      const ch = source[i];
      if (ch === "\\") {
        i += 2;
        continue;
      }
      if (ch === "[") {
        inCharClass = true;
        i++;
        continue;
      }
      if (ch === "]") {
        inCharClass = false;
        i++;
        continue;
      }
      if (ch === "/" && !inCharClass) {
        i++;
        while (i < source.length && /[a-z]/.test(source[i])) {
          i++;
        }
        const value = source.slice(start, i);
        this.cursor = i;
        return {
          type: "RegExpLiteral",
          value,
          start,
          end: i,
        };
      }
      if (ch === "\n") {
        return null;
      }
      i++;
    }

    return null;
  }

  private scanTemplateLiteral(): Token {
    const source = this.parser.syntax;
    const start = this.cursor;
    let i = start + 1;

    while (i < source.length) {
      const ch = source[i];

      if (ch === "\\") {
        i += 2;
        continue;
      }

      if (ch === "`") {
        i++;
        const value = source.slice(start, i);
        this.cursor = i;
        return {
          type: "TemplateLiteral",
          value,
          start,
          end: i,
        };
      }

      if (ch === "$" && source[i + 1] === "{") {
        i += 2;
        let depth = 1;
        while (i < source.length && depth > 0) {
          const inner = source[i];
          if (inner === "\\") {
            i += 2;
            continue;
          }
          if (inner === '"' || inner === "'") {
            const quote = inner;
            i++;
            while (i < source.length && source[i] !== quote) {
              if (source[i] === "\\") i++;
              i++;
            }
            i++;
            continue;
          }
          if (inner === "`") {
            i++;
            while (i < source.length) {
              if (source[i] === "\\") {
                i += 2;
                continue;
              }
              if (source[i] === "$" && source[i + 1] === "{") {
                i += 2;
                let innerDepth = 1;
                while (i < source.length && innerDepth > 0) {
                  if (source[i] === "{") innerDepth++;
                  else if (source[i] === "}") innerDepth--;
                  i++;
                }
                continue;
              }
              if (source[i] === "`") {
                i++;
                break;
              }
              i++;
            }
            continue;
          }
          if (inner === "{") depth++;
          else if (inner === "}") depth--;
          i++;
        }
        continue;
      }

      i++;
    }

    throw new SyntaxError(`Template literal không đóng, bắt đầu tại vị trí ${start}`);
  }

  private match(regexp: RegExp, syntax: string) {
    const formattedSyntax = syntax.split(";");
    const matched = regexp.exec(formattedSyntax[0].concat(";"));

    if (matched && matched.index === 0) {
      this.cursor += matched[0].length;
      return matched[0];
    }

    return null;
  }
}
