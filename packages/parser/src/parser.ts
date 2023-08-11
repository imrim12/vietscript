import { Token } from "@vietscript/shared";

import { Tokenizer } from "./tokenizer";
import { Program } from "./nodes/Program";
import { Keyword } from "./constants/keyword.enum"

export class Parser {
  public syntax: string;

  public tokenizer: Tokenizer;

  public lookahead: Token | null;

  /**
   * Initializes the parser.
   */
  constructor() {
    this.syntax = "";
    this.tokenizer = new Tokenizer(this);
    this.lookahead = null;
  }

  public parse(syntax: string, InitAtsNodeClass?: any): any;

  /**
   * Parse a Formkl syntax string into Formkl object
   */
  public parse(syntax: string) {
    this.lookahead = null;
    this.syntax = "";

    this.syntax = syntax;
    this.tokenizer = new Tokenizer(this);

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
      switch (tokenType) {
        case Keyword.IDENTIFIER:
          throw new SyntaxError(`Unexpected token: "${token.value}", cannot use keyword "${token.value}" for the beginning of the identifer`);
        default:
          throw new SyntaxError(`Unexpected token: "${token.value}", expected: "${tokenType}"`);
      }
    }

    this.lookahead = this.tokenizer.getNextToken(tokenType === "Identifier");

    return token;
  }
}
