import { Token, Spec } from "@davascript/shared";

/**
 * Tokenizer spec.
 */
const Specs: Array<Spec> = [
  // --------------------------------------
  // Whitespace:
  [/^\s+/, null],

  // --------------------------------------
  // Comments:
  // Skip single-line comments:
  [/^\/\/.*/, null],
  // Skip multi-line comments:
  [/^\/\*[\S\s]*?\*\//, null],

  // --------------------------------------
  // Symbols and delimiters:
  [/^\[/, "["], // OpenBracket
  [/^]/, "]"], // CloseBracket
  [/^\(/, "("], // OpenParen
  [/^\)/, ")"], // CloseParen
  [/^{/, "{"], // OpenBrace
  [/^}/, "}"], // CloseBrace
  [/^;/, ";"], // SemiColon
  [/^,/, ","], // Comma
  [/^=/, "="], // Assign
  [/^\?/, "?"], // QuestionMark
  [/^\?\.?/, "?."], // QuestionMarkDot
  [/^:/, ":"], // Colon
  [/^\.{3}/, "..."], // Ellipsis
  [/^\./, "."], // Dot
  [/^\+\+/, "++"], // PlusPlus
  [/^--/, "--"], // MinusMinus
  [/^\+/, "+"], // Plus
  [/^-/, "-"], // Minus
  [/^~/, "~"], // BitNot
  [/^!/, "!"], // Not
  [/^\*/, "*"], // Multiply
  [/^\//, "/"], // Divide
  [/^%/, "%"], // Modulus
  [/^\*\*/, "**"], // Power
  [/^\?\?/, "??"], // NullCoalesce
  [/^#/, "#"], // Hashtag
  [/^>>/, ">>"], // RightShiftArithmetic
  [/^<</, "<<"], // LeftShiftArithmetic
  [/^>>>/, ">>>"], // RightShiftLogical
  [/^</, "<"], // LessThan
  [/^>/, ">"], // MoreThan
  [/^<=/, "<="], // LessThanEquals
  [/^>=/, ">="], // GreaterThanEquals
  [/^==/, "=="], // Equals_
  [/^!=/, "!="], // NotEquals
  [/^===/, "==="], // IdentityEquals
  [/^!==/, "!=="], // IdentityNotEquals
  [/^&/, "&"], // BitAnd
  [/^\^/, "^"], // BitXOr
  [/^\|/, "|"], // BitOr
  [/^&&/, "&&"], // And
  [/^\|\|/, "||"], // Or
  [/^\*=/, "*="], // MultiplyAssign
  [/^\//, "/="], // DivideAssign
  [/^%=/, "%="], // ModulusAssign
  [/^\+=/, "+="], // PlusAssign
  [/^-=/, "-="], // MinusAssign
  [/^<<=/, "<<="], // LeftShiftArithmeticAssign
  [/^>>=/, ">>="], // RightShiftArithmeticAssign
  [/^>>>=/, ">>>="], // RightShiftLogicalAssign
  [/^&=/, "&="], // BitAndAssign
  [/^\^=/, "^="], // BitXorAssign
  [/^\|=/, "|="], // BitOrAssign
  [/^\*\*=/, "**="], // PowerAssign
  [/^=>/, "=>"], // ARROW

  // --------------------------------------
  // Keywords
  [/^\bbreak\b/, "Break"],
  [/^\bdo\b/, "Do"],
  [/^\binstanceof\b/, "Instanceof"],
  [/^\btypeof\b/, "Typeof"],
  [/^\bcase\b/, "Case"],
  [/^\belse\b/, "Else"],
  [/^\bnew\b/, "New"],
  [/^\bvar\b/, "Var"],
  [/^\bcatch\b/, "Catch"],
  [/^\bfinally\b/, "Finally"],
  [/^\breturn\b/, "Return"],
  [/^\bvoid\b/, "Void"],
  [/^\bcontinue\b/, "Continue"],
  [/^\bfor\b/, "For"],
  [/^\bswitch\b/, "Switch"],
  [/^\bwhile\b/, "While"],
  [/^\bdebugger\b/, "Debugger"],
  [/^\bfunction\b/, "Function_"],
  [/^\bthis\b/, "This"],
  [/^\bwith\b/, "With"],
  [/^\bdefault\b/, "Default"],
  [/^\bif\b/, "If"],
  [/^\bthrow\b/, "Throw"],
  [/^\bdelete\b/, "Delete"],
  [/^\bin\b/, "In"],
  [/^\btry\b/, "Try"],
  [/^\bas\b/, "As"],
  [/^\bfrom\b/, "From"],

  // --------------------------------------
  // Future Reserved Words
  [/^\bclass\b/, "Class"],
  [/^\benum\b/, "Enum"],
  [/^\bextends\b/, "Extends"],
  [/^\bsuper\b/, "Super"],
  [/^\bconst\b/, "Const"],
  [/^\bexport\b/, "Export"],
  [/^\bimport\b/, "Import"],
  [/^\basync\b/, "Async"],
  [/^\bawait\b/, "Await"],
  [/^\byield\b/, "Yield"],
  [/^\bimplements\b/, "Implements"],
  [/^\blet\b/, "StrictLet"],
  [/^\bprivate\b/, "Private"],
  [/^\bpublic\b/, "Public"],
  [/^\binterface\b/, "Interface"],
  [/^\bpackage\b/, "Package"],
  [/^\bprotected\b/, "Protected"],
  [/^\bstatic\b/, "Static"],

  // --------------------------------------
  // Identifier
  [/^\$\w+/, "IDENTIFIER"],

  // --------------------------------------
  // Primitive Literals:

  // --------------------------------------
  // Numbers:
  [/^\d+/, "NUMBER"],

  // --------------------------------------
  // Double quoted String:
  [/^"[^"]*"/, "STRING"],

  // --------------------------------------
  // Single quoted String:
  [/^'[^']*'/, "STRING"],

  // --------------------------------------
  // Literal with Keyword:
  [/^\bnull\b/, "NULL"],
  [/^\bNaN\b/, "NAN"],
  [/^\bundefined\b/, "UNDEFINED"],
  [/^\b(true|false)\b/, "BOOLEAN"],
];

/**
 * Tokenizer class
 * Lazily pulls a token from a stream.
 */
export class Tokenizer {
  private _string: string;

  private _cursor: number;

  /**
   * Initializes the string.
   */
  constructor(string: string) {
    this._string = string;
    this._cursor = 0; // track the position of each character
  }

  /**
   * Whether the tokenizer reached EOF.
   */
  isEOF() {
    return this._cursor === this._string.length;
  }

  /**
   * Whether we still have more tokens.
   */
  hasMoreTokens() {
    return this._cursor < this._string.length;
  }

  /**
   * Obtains next token.
   */
  getNextToken(): Token | null {
    if (!this.hasMoreTokens()) {
      return null;
    }
    const string = this._string.slice(this._cursor);

    for (const [regexp, tokenType] of Specs) {
      const tokenValue = this._match(regexp, string);

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
      };
    }

    throw new SyntaxError(`Unexpected token: "${string[0]}"`);
  }

  /**
   * Matches a token for a regular expression.
   */
  _match(regexp: RegExp, string: string) {
    const matched = regexp.exec(string);

    if (matched === null) {
      return null;
    }
    this._cursor += matched[0].length;

    return matched[0];
  }
}
