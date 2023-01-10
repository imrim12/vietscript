import { Token, Spec } from "@davascript/shared";

const vietnameseUnicodeSet =
  "\\u00C0\\u00C1\\u00C2\\u00C3\\u00C8\\u00C9\\u00CA\\u00CC\\u00CD\\u00D2\\u00D3\\u00D4\\u00D5\\u00D9\\u00DA\\u0102\\u0110\\u0128\\u0168\\u01A0\\u00E0\\u00E1\\u00E2\\u00E3\\u00E8\\u00E9\\u00EA\\u00EC\\u00ED\\u00F2\\u00F3\\u00F4\\u00F5\\u00F9\\u00FA\\u0103\\u0111\\u0129\\u0169\\u01A1\\u01AF\\u0102\\u1EA0\\u1EA2\\u1EA4\\u1EA6\\u1EA8\\u1EAA\\u1EAC\\u1EAE\\u1EB0\\u1EB2\\u1EB4\\u1EB6\\u1EB8\\u1EBA\\u1EBC\\u1EC0{2}\\u1EC2\\u01B0\\u0103\\u1EA1\\u1EA3\\u1EA5\\u1EA7\\u1EA9\\u1EAB\\u1EAD\\u1EAF\\u1EB1\\u1EB3\\u1EB5\\u1EB7\\u1EB9\\u1EBB\\u1EBD\\u1EC1{2}\\u1EC3\\u1EC4\\u1EC6\\u1EC8\\u1ECA\\u1ECC\\u1ECE\\u1ED0\\u1ED2\\u1ED4\\u1ED6\\u1ED8\\u1EDA\\u1EDC\\u1EDE\\u1EE0\\u1EE2\\u1EE4\\u1EE6\\u1EE8\\u1EEA\\u1EC5\\u1EC7\\u1EC9\\u1ECB\\u1ECD\\u1ECF\\u1ED1\\u1ED3\\u1ED5\\u1ED7\\u1ED9\\u1EDB\\u1EDD\\u1EDF\\u1EE1\\u1EE3\\u1EE5\\u1EE7\\u1EE9\\u1EEB\\u1EEC\\u1EEE\\u1EF0\\u1EF2\\u1EF4\\u00DD\\u1EF6\\u1EF8\\u1EED\\u1EEF\\u1EF1\\u1EF3\\u1EF5\\u1EF7\\u1EF9";

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
  [/^\b(var|khai b\u00E1o)\b/, "Var"],
  [/^\bbreak\b/, "Break"],
  [/^\bdo\b/, "Do"],
  [/^\binstanceof\b/, "Instanceof"],
  [/^\btypeof\b/, "Typeof"],
  [/^\bcase\b/, "Case"],
  [/^\belse\b/, "Else"],
  [/^\bnew\b/, "New"],
  [/^\bcatch\b/, "Catch"],
  [/^\bfinally\b/, "Finally"],
  [/^\breturn\b/, "Return"],
  [/^\bvoid\b/, "Void"],
  [/^\bcontinue\b/, "Continue"],
  [/^\bfor\b/, "For"],
  [/^\bswitch\b/, "Switch"],
  [/^\bwhile\b/, "While"],
  [/^\bdebugger\b/, "Debugger"],
  [/^\bfunction\b/, "Function"],
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
  [/^const|h\u1EB1ng s\u1ED1/, "Const"],
  [/^\bclass\b/, "Class"],
  [/^\benum\b/, "Enum"],
  [/^\bextends\b/, "Extends"],
  [/^\bsuper\b/, "Super"],
  [/^\bexport\b/, "Export"],
  [/^\bimport\b/, "Import"],
  [/^\basync\b/, "Async"],
  [/^\bawait\b/, "Await"],
  [/^\byield\b/, "Yield"],
  [/^\bimplements\b/, "Implements"],
  [/^\blet\b/, "Let"],
  [/^\bprivate\b/, "Private"],
  [/^\bpublic\b/, "Public"],
  [/^\binterface\b/, "Interface"],
  [/^\bpackage\b/, "Package"],
  [/^\bprotected\b/, "Protected"],
  [/^\bstatic\b/, "Static"],

  // --------------------------------------
  // Primitive Literals:

  // --------------------------------------
  // Numbers:
  [/^(\d+(\.\d+|)([Ee]([+-]|)\d+|))/, "Number"],

  // --------------------------------------
  // Double quoted String:
  [/^"[^"]*"/, "String"],

  // --------------------------------------
  // Single quoted String:
  [/^'[^']*'/, "String"],

  // --------------------------------------
  // Template quoted String:
  [/^`[^`]*`/, "String"],

  // --------------------------------------
  // Literal with Keyword:
  [/^\bnull\b/, "Null"],
  [/^\bNaN\b/, "NaN"],
  [/^\b(undefined|kh\u00F4ng x\u00E1c \u0111\u1ECBnh)\b/, "Undefined"],
  [/^\b(true|false)\b/, "Boolean"],

  // --------------------------------------
  // Identifier
  [
    new RegExp(`^[a-zA-Z${vietnameseUnicodeSet}]+(\\s[a-zA-Z${vietnameseUnicodeSet}]+)*`),
    "Identifier",
  ],
];

/**
 * Tokenizer class
 * Lazily pulls a token from a stream.
 */
export class Tokenizer {
  private syntax: string;

  private cursor: number;

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
  private match(regexp: RegExp, syntax: string) {
    const matched = regexp.exec(syntax);

    if (matched === null) {
      return null;
    }
    this.cursor += matched[0].length;

    return matched[0];
  }
}
