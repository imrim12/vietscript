import { Token } from "@vietscript/shared";

import { Keyword } from "./constants/keyword.enum";
import { IdentifierPattern, Specs } from "./constants/specs";
import { Parser } from "./parser";

/**
 * Tokenizer spec.
 */

/**
 * Tokenizer class
 * Lazily pulls a token from a stream.
 */
export class Tokenizer {
  private parser: Parser;

  private syntax: string;

  private cursor: number;

  private skipped: Array<string> = [];

  public executable = "";

  /**
   * Initializes the string.
   */
  constructor(syntax: string, parser: Parser) {
    this.parser = parser;
    this.syntax = syntax;
    this.cursor = 0; // track the position of each character
  }

  /**
   * Whether the tokenizer reached EOF.
   */
  public isEOF() {
    return this.cursor === this.syntax.length;
  }

  /**
   * Whether we still have more tokens.
   */
  protected hasMoreTokens() {
    return this.cursor < this.syntax.length;
  }

  /**
   * Obtains next token.
   */
  public getNextToken(isIdentifier = false): Token | null {
    if (!this.hasMoreTokens()) {
      return null;
    }

    let string = this.syntax.slice(this.cursor);

    if (isIdentifier) {
      string = this.parser.lookahead?.value + this.skipped.join("") + string;
      this.cursor -= String(this.parser.lookahead?.value + this.skipped.join("")).length;

      const tokenValue = this.match(IdentifierPattern, string);

      return {
        type: "Identifier",
        value: String(tokenValue),
        start: this.cursor - String(tokenValue).length,
        end: this.cursor,
      };
    }

    for (const [regexp, tokenType] of Specs) {
      const tokenValue = this.match(regexp, string);

      // Couldn't match this rule, continue.
      if (tokenValue === null) {
        continue;
      }

      // Should skip this null token because could be a whitespace or something else
      if (tokenType === null) {
        this.executable += tokenValue;

        this.skipped.push(tokenValue);

        return this.getNextToken();
      }

      this.skipped = [];

      let tokenValueEncoded = tokenValue;

      switch (tokenType) {
        case Keyword.IDENTIFIER: {
          tokenValueEncoded = String(tokenValue)
            .replace(/\s/g, "_")
            .replace(/[^\dA-Za-z]/g, (match) => encodeURI(match).replace(/%/g, ""));
          break;
        }
        case Keyword.NAN:
        case Keyword.NULL:
        case Keyword.UNDEFINED:
        case Keyword.BOOLEAN:
        case Keyword.STRING:
        case Keyword.NUMBER: {
          tokenValueEncoded = String(tokenValue);
          break;
        }
        default: {
          tokenValueEncoded = (tokenType || "").toLowerCase();
          break;
        }
      }

      this.executable += tokenValueEncoded;

      // We return the token
      return {
        type: tokenType,
        value: tokenValue,
        start: this.cursor - String(tokenValue).length,
        end: this.cursor,
      };
    }

    throw new SyntaxError(`Unexpected token: "${string[0]}"`);
  }

  /**
   * Matches a token for a regular expression.
   */
  private match(regexp: RegExp, syntax: string) {
    const matched = regexp.exec(syntax);

    if (matched === null) {
      return null;
    }
    this.cursor += matched[0].length;

    return matched[0];
  }
}
