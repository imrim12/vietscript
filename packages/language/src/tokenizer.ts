import { Token, Spec } from "@davascript/shared";

// ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀ{2}Ểưăạảấầẩẫậắằẳẵặẹẻẽề{2}ểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ
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
  [/^===/, "==="], // IdentityEquals
  [/^==/, "=="], // Equals_
  [/^!==/, "!=="], // IdentityNotEquals
  [/^!=/, "!="], // NotEquals
  [/^=/, "="], // Assign
  [/^\?/, "?"], // QuestionMark
  [/^\?\.?/, "?."], // QuestionMarkDot
  [/^:/, ":"], // Colon
  [/^\.{3}/, "..."], // Ellipsis
  [/^\./, "."], // Dot
  [/^\+\+/, "++"], // PlusPlus
  [/^\+/, "+"], // Plus
  [/^--/, "--"], // MinusMinus
  [/^-/, "-"], // Minus
  [/^~/, "~"], // BitNot
  [/^!/, "!"], // Not
  [/^\*/, "*"], // Multiply
  [/^\//, "/"], // Divide
  [/^%/, "%"], // Modulus
  [/^\*\*/, "**"], // Power
  [/^\?\?/, "??"], // NullCoalesce
  [/^#/, "#"], // Hashtag
  [/^>>>=/, ">>>="], // RightShiftLogicalAssign
  [/^>>>/, ">>>"], // RightShiftLogical
  [/^>>/, ">>"], // RightShiftArithmetic
  [/^>>=/, ">>="], // RightShiftArithmeticAssign
  [/^<<=/, "<<="], // LeftShiftArithmeticAssign
  [/^<</, "<<"], // LeftShiftArithmetic
  [/^<=/, "<="], // LessThanEquals
  [/^>=/, ">="], // GreaterThanEquals
  [/^</, "<"], // LessThan
  [/^>/, ">"], // MoreThan
  [/^&&/, "&&"], // And
  [/^\|\|/, "||"], // Or
  [/^&/, "&"], // BitAnd
  [/^\^/, "^"], // BitXOr
  [/^\|/, "|"], // BitOr
  [/^\*=/, "*="], // MultiplyAssign
  [/^\//, "/="], // DivideAssign
  [/^%=/, "%="], // ModulusAssign
  [/^\+=/, "+="], // PlusAssign
  [/^-=/, "-="], // MinusAssign
  [/^&=/, "&="], // BitAndAssign
  [/^\^=/, "^="], // BitXorAssign
  [/^\|=/, "|="], // BitOrAssign
  [/^\*\*=/, "**="], // PowerAssign
  [/^=>/, "=>"], // ARROW

  // --------------------------------------
  // Keywords
  [/^\b(var|khai b\u00E1o)\b/, "Var"], // khai báo
  [/^\b(break|ph\u00E1 v\u00F2ng l\u1EB7p)\b/, "Break"], // phá vòng lặp
  [/^\b(do|th\u1EF1c hi\u1EC7n)\b/, "Do"], // thực hiện
  [/^\binstanceof\b/, "Instanceof"],
  [/^\b(typeof|ki\u1EC3u c\u1EE7a)\b/, "Typeof"], // kiểu của
  [/^\b(switch|duy\u1EC7t)\b/, "Switch"], // duyệt
  [/^\b(case|tr\u01B0\u1EDDng h\u1EE3p)\b/, "Case"], // trường hợp
  [/^\b(if|n\u1EBFu)\b/, "If"], // nếu
  [/^\b(else|kh\u00F4ng th\u00EC)/, "Else"], // không thì
  [/^\bnew\b/, "New"],
  [/^\b(catch|b\u1EAFt l\u1ED7i)\b/, "Catch"], // bắt lỗi
  [/^\b(finally|cu\u1ED1i c\u00F9ng)\b/, "Finally"], // cuối cùng
  [/^\b(return|tr\u1EA3 v\u1EC1)\b/, "Return"], // trả về
  [/^\bvoid\b/, "Void"],
  [/^\b(continue|ti\u1EBFp t\u1EE5c)\b/, "Continue"], // tiếp tục
  [/^\bfor\b/, "For"], // lặp
  [/^\b(while|khi m\u00E0)\b/, "While"], // khi mà
  [/^\bdebugger\b/, "Debugger"],
  [/^\b(function|h\u00E0m)\b/, "Function"], // hàm
  [/^\bthis\b/, "This"], // đối tượng này
  [/^\bwith\b/, "With"], // với
  [/^\b(default|m\u1EB7c \u0111\u1ECBnh)\b/, "Default"], // mặc định
  [/^\b(throw|b\u00E1o l\u1ED7i)\b/, "Throw"], // báo lỗi
  [/^\b(delete|xo\u00E1)\b/, "Delete"], // xoá
  [/^\b(in|trong)\b/, "In"], // trong
  [/^\b(try|th\u1EED)/, "Try"], // thử
  [/^\bas\b/, "As"],
  [/^\b(from|t\u1EEB)\b/, "From"], // từ

  // --------------------------------------
  // Future Reserved Words
  [/^const|h\u1EB1ng s\u1ED1/, "Const"], // hằng số
  [/^\b(class|l\u1EDBp)\b/, "Class"], // lớp
  [/^\benum\b/, "Enum"],
  [/^\b(extends|k\u1EBF th\u1EEBa)\b/, "Extends"], // kế thừa
  [/^\b(super|kh\u1EDFi t\u1EA1o cha)\b/, "Super"], // khởi tạo cha
  [/^\b(export|xu\u1EA5t)\b/, "Export"], // xuất
  [/^\b(import|nh\u1EADp)\b/, "Import"], // nhập
  [/^\b(async|b\u1EA5t \u0111\u1ED3ng b\u1ED9)/, "Async"], // bất đồng bộ
  [/^\b(await|ch\u1EDD)\b/, "Await"], // chờ
  [/^\byield\b/, "Yield"],
  [/^\bimplements\b/, "Implements"], // áp dụng
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
