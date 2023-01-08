import { Token } from "@davascript/shared";

import { Tokenizer } from "./tokenizer";
import { Program } from "./nodes/Program";

export class Parser {
  private _string: string;

  private _tokenizer: Tokenizer;

  lookahead: Token | null;

  /**
   * Initializes the parser.
   */
  constructor() {
    this._string = "";
    this._tokenizer = new Tokenizer("");
    this.lookahead = null;
  }

  /**
   * Parse a Formkl syntax string into Formkl object
   */
  parse(string: string) {
    this.lookahead = null;
    this._string = "";

    this._string = string;
    this._tokenizer = new Tokenizer(this._string);

    // Prime the tokenizer to obtain the first
    // token which is our lookahead. The lookahead is
    // used for predective parsing.

    this.lookahead = this._tokenizer.getNextToken();

    // Parse recursively starting from the main
    // entry point, the Program:
    return new Program(this);
  }

  /**
   * Expects a token of a given type.
   */
  eat(tokenType: Token["type"]) {
    const token = this.lookahead;

    if (token === null) {
      // un token nulo es como un token EOF.
      throw new SyntaxError(`Unexpected end of input, expected: "${tokenType}"`);
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(`Unexpected token: "${token.value}", expected: "${tokenType}"`);
    }

    // Advance to next token.
    this.lookahead = this._tokenizer.getNextToken();

    return token;
  }
}
