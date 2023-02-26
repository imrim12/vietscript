import { Token } from "@vietscript/shared";

import { Keyword } from "./constants/keyword.enum";
import { Specs } from "./constants/specs";

/**
 * Tokenizer spec.
 */

/**
 * Tokenizer class
 * Lazily pulls a token from a stream.
 */
export class Tokenizer {
  private syntax: string;

  private cursor: number;

  public executable = "";

  /**
   * Initializes the string.
   */
  constructor(syntax: string) {
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
  public getNextToken(): Token | null {
    if (!this.hasMoreTokens()) {
      return null;
    }
    const string = this.syntax.slice(this.cursor);

    for (const [regexp, tokenType] of Specs) {
      const tokenValue = this.match(regexp, string);

      // Couldn't match this rule, continue.
      if (tokenValue === null) {
        continue;
      }

      // Should skip this null token because could be a whitespace or something else
      if (tokenType === null) {
        this.executable += tokenValue;

        return this.getNextToken();
      }

      switch (tokenType) {
        case Keyword.IDENTIFIER: {
          this.executable += String(tokenValue)
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
          this.executable += String(tokenValue);
          break;
        }
        default: {
          this.executable += (tokenType || "").toLowerCase();
          break;
        }
      }

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
