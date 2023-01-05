import { Tokenizer } from "./tokenizer";
import { Token } from "./types";

export class Parser {
  private _string: string;

  private _tokenizer: Tokenizer;

  private _lookahead: Token | null;

  /**
   * Initializes the parser.
   */
  constructor() {
    this._string = "";
    this._tokenizer = new Tokenizer("");
    this._lookahead = null;
  }

  /**
   * Parse a Formkl syntax string into Formkl object
   */
  parse(string: string) {
    this._string = "";
    this._lookahead = null;

    this._string = string;
    this._tokenizer = new Tokenizer(this._string);

    // Prime the tokenizer to obtain the first
    // token which is our lookahead. The lookahead is
    // used for predective parsing.

    this._lookahead = this._tokenizer.getNextToken();

    // Parse recursively starting from the main
    // entry point, the Program:
    return this.Program();
  }

  private Program() {
    //
  }

  /**
   * StringList
   *  = StringLiteral
   *  | StringList ',' StringLiteral
   *  ;
   */
  private StringList() {
    const strings = [];

    do {
      strings.push(this.StringLiteral());
    } while (this._lookahead?.type === "," && this._eat(","));

    return strings;
  }

  /**
   * NaNLiteral
   *  = 'NaN'
   *  ;
   */
  private NaNLiteral() {
    this._eat("NAN");

    return Number.NaN;
  }

  /*
   * NumericLiteral
   *  = NUMBER
   *  ;
   */
  private NumericLiteral() {
    const token = this._eat("NUMBER");

    return Number(token.value);
  }

  /**
   * StringLiteral
   *   : STRING
   *   ;
   */
  private StringLiteral() {
    const token = this._eat("STRING");

    return String(token.value).slice(1, -1);
  }

  /**
   * BooleanLiteral
   *  = TRUE
   *  | FALSE
   *  ;
   */
  private BooleanLiteral(value: "TRUE" | "FALSE") {
    this._eat(value ? "TRUE" : "FALSE");

    return value;
  }

  /**
   * NullLiteral
   *  = 'null'
   *  ;
   */
  private NullLiteral() {
    this._eat("NULL");

    return null;
  }

  /**
   * UndefinedLiteral
   *  = 'undefined'
   *  ;
   */
  private UndefinedLiteral() {
    this._eat("UNDEFINED");

    return;
  }

  /**
   * Expects a token of a given type.
   */
  _eat(tokenType: Token["type"]) {
    const token = this._lookahead;

    if (token === null) {
      // un token nulo es como un token EOF.
      throw new SyntaxError(`Unexpected end of input, expected: "${tokenType}"`);
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(`Unexpected token: "${token.value}", expected: "${tokenType}"`);
    }

    // Advance to next token.
    this._lookahead = this._tokenizer.getNextToken();

    return token;
  }
}
