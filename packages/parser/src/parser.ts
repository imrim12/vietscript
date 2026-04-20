import { Keyword, Token } from "@vietscript/shared";

import { Tokenizer } from "./tokenizer";
import { Program } from "./nodes/Program";
import { VietScriptError } from "./errors";

export class Parser {
  public syntax: string;

  public tokenizer: Tokenizer;

  public lookahead: Token | null;

  public filename?: string;

  constructor() {
    this.syntax = "";
    this.tokenizer = new Tokenizer(this);
    this.lookahead = null;
  }

  public parse(syntax: string, InitAtsNodeClass?: any): any;

  public parse(syntax: string) {
    this.lookahead = null;
    this.syntax = "";

    this.syntax = syntax;
    this.tokenizer = new Tokenizer(this);

    this.lookahead = this.tokenizer.getNextToken();

    return new Program(this);
  }

  eat(tokenType: Token["type"]) {
    const token = this.lookahead;

    if (token === null) {
      throw new VietScriptError(`Unexpected end of input, expected: "${tokenType}"`, {
        file: this.filename,
        source: this.syntax,
        offset: this.syntax.length,
      });
    }

    if (token.type !== tokenType) {
      if (tokenType === Keyword.IDENTIFIER) {
        throw new VietScriptError(
          `Unexpected token: "${token.value}", cannot use keyword "${token.value}" for the beginning of the identifer`,
          {
            file: this.filename,
            source: this.syntax,
            offset: token.start,
          },
        );
      }
      throw new VietScriptError(`Unexpected token: "${token.value}", expected: "${tokenType}"`, {
        file: this.filename,
        source: this.syntax,
        offset: token.start,
      });
    }

    this.lookahead = this.tokenizer.getNextToken();

    return token;
  }
}
