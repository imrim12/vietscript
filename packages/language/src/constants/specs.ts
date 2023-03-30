import { Spec } from "@vietscript/shared";

import { Keyword } from "./keyword.enum";
import { vietnameseUnicodeSet } from "./unicode";

export const IdentifierPattern = new RegExp(
  `^[a-zA-Z${vietnameseUnicodeSet}]+(\\s[a-zA-Z${vietnameseUnicodeSet}]+)*`,
);

export const Specs: Array<Spec> = [
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
  [/^\b(var|khai b\u00E1o)\b/, Keyword.VAR], // khai báo
  [/^\b(break|ph\u00E1 v\u00F2ng l\u1EB7p)\b/, Keyword.BREAK], // phá vòng lặp
  [/^\b(do|th\u1EF1c hi\u1EC7n)\b/, Keyword.DO], // thực hiện
  [/^\binstanceof\b/, Keyword.INSTANCEOF],
  [/^\b(typeof|ki\u1EC3u c\u1EE7a)\b/, Keyword.TYPEOF], // kiểu của
  [/^\b(switch|duy\u1EC7t)\b/, Keyword.SWITCH], // duyệt
  [/^\b(case|tr\u01B0\u1EDDng h\u1EE3p)\b/, Keyword.CASE], // trường hợp
  [/^\b(if|n\u1EBFu)\b/, Keyword.IF], // nếu
  [/^\b(else|kh\u00F4ng th\u00EC)/, Keyword.ELSE], // không thì
  [/^\bnew\b/, Keyword.NEW],
  [/^\b(catch|b\u1EAFt l\u1ED7i)\b/, Keyword.CATCH], // bắt lỗi
  [/^\b(finally|cu\u1ED1i c\u00F9ng)\b/, Keyword.FINALLY], // cuối cùng
  [/^\b(return|tr\u1EA3 v\u1EC1)/, Keyword.RETURN], // trả về
  [/^\bvoid\b/, Keyword.VOID],
  [/^\b(continue|ti\u1EBFp t\u1EE5c)\b/, Keyword.CONTINUE], // tiếp tục
  [/^\bfor\b/, Keyword.FOR], // lặp
  [/^\b(while|khi m\u00E0)\b/, Keyword.WHILE], // khi mà
  [/^\bdebugger\b/, Keyword.DEBUGGER],
  [/^\b(function|h\u00E0m)\b/, Keyword.FUNCTION], // hàm
  [/^\bthis\b/, Keyword.THIS], // đối tượng này
  [/^\bwith\b/, Keyword.WITH], // với
  [/^\b(default|m\u1EB7c \u0111\u1ECBnh)\b/, Keyword.DEFAULT], // mặc định
  [/^\b(throw|b\u00E1o l\u1ED7i)\b/, Keyword.THROW], // báo lỗi
  [/^\b(delete|xo\u00E1)\b/, Keyword.DELETE], // xoá
  [/^\b(in|trong)\b/, Keyword.IN], // trong
  [/^\b(try|th\u1EED)/, Keyword.TRY], // thử
  [/^\bas\b/, Keyword.AS],
  [/^\b(from|t\u1EEB)\b/, Keyword.FROM], // từ

  // --------------------------------------
  // Future Reserved Words
  [/^const|h\u1EB1ng s\u1ED1/, Keyword.CONST], // hằng số
  [/^\b(class|l\u1EDBp)\b/, Keyword.CLASS], // lớp
  [/^\b(super|kh\u1EDFi t\u1EA1o cha)\b/, Keyword.SUPER], // khởi tạo cha
  [/^\b(constructor|kh\u1EDFi t\u1EA1o)\b/, Keyword.CONSTRUCTOR], // khởi tạo
  [/^\benum\b/, Keyword.ENUM],
  [/^\b(extends|k\u1EBF th\u1EEBa)\b/, Keyword.EXTENDS], // kế thừa
  [/^\b(export|xu\u1EA5t)\b/, Keyword.EXPORT], // xuất
  [/^\b(import|nh\u1EADp)\b/, Keyword.IMPORT], // nhập
  [/^\b(async|b\u1EA5t \u0111\u1ED3ng b\u1ED9)/, Keyword.ASYNC], // bất đồng bộ
  [/^\b(await|ch\u1EDD)\b/, Keyword.AWAIT], // chờ
  [/^\byield\b/, Keyword.YIELD],
  [/^\bimplements\b/, Keyword.IMPLEMENTS], // áp dụng
  [/^\blet\b/, Keyword.LET],
  [/^\bprivate\b/, Keyword.PRIVATE],
  [/^\bpublic\b/, Keyword.PUBLIC],
  [/^\binterface\b/, Keyword.INTERFACE],
  [/^\bprotected\b/, Keyword.PROTECTED],
  [/^\bstatic\b/, Keyword.STATIC],

  // --------------------------------------
  // Primitive Literals:

  // --------------------------------------
  // Numbers:
  [/^(\d+(\.|)(\d+|)([Ee]([+-]|)\d+|))/, Keyword.NUMBER],

  // --------------------------------------
  // Double quoted String:
  [/^"[^"]*"/, Keyword.STRING],

  // --------------------------------------
  // Single quoted String:
  [/^'[^']*'/, Keyword.STRING],

  // --------------------------------------
  // Template quoted String:
  [/^`[^`]*`/, Keyword.STRING],

  // --------------------------------------
  // Literal with Keyword:
  [/^\bnull\b/, Keyword.NULL],
  [/^\bNaN\b/, Keyword.NAN],
  [/^\b(undefined|kh\u00F4ng x\u00E1c \u0111\u1ECBnh)\b/, Keyword.UNDEFINED],
  [/^\b(true|false)\b/, Keyword.BOOLEAN],

  // --------------------------------------
  // Identifier
  [IdentifierPattern, Keyword.IDENTIFIER],
];
