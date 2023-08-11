import { Token } from "@vietscript/shared";

import { Specs } from "./constants/specs";
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

  private cursor: number;

  /**
   * Initializes the string.
   */
  constructor(parser: Parser) {
    this.parser = parser;
    this.cursor = 0; // track the position of each character
  }

  /**
   * Whether the tokenizer reached EOF.
   */
  public isEOF() {
    return this.cursor === this.parser.syntax.length;
  }

  /**
   * Whether we still have more tokens.
   */
  protected hasMoreTokens() {
    return this.cursor < this.parser.syntax.length;
  }

  /**
   * Obtains next token.
   */
  public getNextToken(isIdentifier = false): Token | null {
    if (!this.hasMoreTokens()) {
      return null;
    }
    const string = this.parser.syntax.slice(this.cursor);

    for (const [regexp, tokenType] of Specs) {
      const tokenValue = this.match(regexp, string);

      // Couldn't match this rule, continue.
      if (tokenValue === null) {
        continue;
      }

      // Should skip this null token because could be a whitespace or something else
      if (tokenType === null) {
        return this.getNextToken();
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
