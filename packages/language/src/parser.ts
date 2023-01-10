import { Token } from "@davascript/shared";

import { Tokenizer } from "./tokenizer";
import { Program } from "./nodes/Program";

export class Parser {
  public syntax: string;

  public tokenizer: Tokenizer;

  public lookahead: Token | null;

  /**
   * Initializes the parser.
   */
  constructor() {
    this.syntax = "";
    this.tokenizer = new Tokenizer("");
    this.lookahead = null;
  }

  public parse(syntax: string, InitAtsNodeClass: any): any;

  /**
   * Parse a Formkl syntax string into Formkl object
   */
  public parse(syntax: string) {
    this.lookahead = null;
    this.syntax = "";

    this.syntax = syntax;
    this.tokenizer = new Tokenizer(this.syntax);

    this.lookahead = this.tokenizer.getNextToken();

    return new Program(this);
  }

  /**
   * Expects a token of a given type.
   */
  eat(tokenType: Token["type"]) {
    const token = this.lookahead;

    if (token === null) {
      throw new SyntaxError(`Unexpected end of input, expected: "${tokenType}"`);
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(`Unexpected token: "${token.value}", expected: "${tokenType}"`);
    }

    this.lookahead = this.tokenizer.getNextToken();

    return token;
  }
}
