import { Parser } from "@lang/parser";
import { Tokenizer } from "@lang/tokenizer";

class SingleNodeParser extends Parser {
  parse(syntax: string, InitAtsNodeClass: any) {
    this.lookahead = null;
    this._string = "";

    this._string = syntax;
    this._tokenizer = new Tokenizer(this._string);

    // Prime the tokenizer to obtain the first
    // token which is our lookahead. The lookahead is
    // used for predective parsing.

    this.lookahead = this._tokenizer.getNextToken();

    return new InitAtsNodeClass(this);
  }
}

export default new SingleNodeParser();
