import { Parser } from "@lang/parser";
import { Tokenizer } from "@lang/tokenizer";

class SingleNodeParser extends Parser {
  parse(syntax: string, InitAtsNodeClass: any) {
    this.lookahead = null;
    this.syntax = "";

    this.syntax = syntax;
    this.tokenizer = new Tokenizer(this);

    // Prime the tokenizer to obtain the first
    // token which is our lookahead. The lookahead is
    // used for predective parsing.

    this.lookahead = this.tokenizer.getNextToken();

    return new InitAtsNodeClass(this);
  }
}

export default new SingleNodeParser();
