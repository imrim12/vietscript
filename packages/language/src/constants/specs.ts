import { Spec } from "@vietscript/shared";

import { Keyword } from "./keyword.enum";
import { vietnameseUnicodeSet } from "./unicode";

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
  [/^\b(var|khai b\u00E1o)\b/, Keyword.VAR], // khai b??o
  [/^\b(break|ph\u00E1 v\u00F2ng l\u1EB7p)\b/, Keyword.BREAK], // ph?? v??ng l???p
  [/^\b(do|th\u1EF1c hi\u1EC7n)\b/, Keyword.DO], // th???c hi???n
  [/^\binstanceof\b/, Keyword.INSTANCEOF],
  [/^\b(typeof|ki\u1EC3u c\u1EE7a)\b/, Keyword.TYPEOF], // ki???u c???a
  [/^\b(switch|duy\u1EC7t)\b/, Keyword.SWITCH], // duy???t
  [/^\b(case|tr\u01B0\u1EDDng h\u1EE3p)\b/, Keyword.CASE], // tr?????ng h???p
  [/^\b(if|n\u1EBFu)\b/, Keyword.IF], // n???u
  [/^\b(else|kh\u00F4ng th\u00EC)/, Keyword.ELSE], // kh??ng th??
  [/^\bnew\b/, Keyword.NEW],
  [/^\b(catch|b\u1EAFt l\u1ED7i)\b/, Keyword.CATCH], // b???t l???i
  [/^\b(finally|cu\u1ED1i c\u00F9ng)\b/, Keyword.FINALLY], // cu???i c??ng
  [/^\b(return|tr\u1EA3 v\u1EC1)/, Keyword.RETURN], // tr??? v???
  [/^\bvoid\b/, Keyword.VOID],
  [/^\b(continue|ti\u1EBFp t\u1EE5c)\b/, Keyword.CONTINUE], // ti???p t???c
  [/^\bfor\b/, Keyword.FOR], // l???p
  [/^\b(while|khi m\u00E0)\b/, Keyword.WHILE], // khi m??
  [/^\bdebugger\b/, Keyword.DEBUGGER],
  [/^\b(function|h\u00E0m)\b/, Keyword.FUNCTION], // h??m
  [/^\bthis\b/, Keyword.THIS], // ?????i t?????ng n??y
  [/^\bwith\b/, Keyword.WITH], // v???i
  [/^\b(default|m\u1EB7c \u0111\u1ECBnh)\b/, Keyword.DEFAULT], // m???c ?????nh
  [/^\b(throw|b\u00E1o l\u1ED7i)\b/, Keyword.THROW], // b??o l???i
  [/^\b(delete|xo\u00E1)\b/, Keyword.DELETE], // xo??
  [/^\b(in|trong)\b/, Keyword.IN], // trong
  [/^\b(try|th\u1EED)/, Keyword.TRY], // th???
  [/^\bas\b/, Keyword.AS],
  [/^\b(from|t\u1EEB)\b/, Keyword.FROM], // t???

  // --------------------------------------
  // Future Reserved Words
  [/^const|h\u1EB1ng s\u1ED1/, Keyword.CONST], // h???ng s???
  [/^\b(class|l\u1EDBp)\b/, Keyword.CLASS], // l???p
  [/^\b(super|kh\u1EDFi t\u1EA1o cha)\b/, Keyword.SUPER], // kh???i t???o cha
  [/^\b(constructor|kh\u1EDFi t\u1EA1o)\b/, Keyword.CONSTRUCTOR], // kh???i t???o
  [/^\benum\b/, Keyword.ENUM],
  [/^\b(extends|k\u1EBF th\u1EEBa)\b/, Keyword.EXTENDS], // k??? th???a
  [/^\b(export|xu\u1EA5t)\b/, Keyword.EXPORT], // xu???t
  [/^\b(import|nh\u1EADp)\b/, Keyword.IMPORT], // nh???p
  [/^\b(async|b\u1EA5t \u0111\u1ED3ng b\u1ED9)/, Keyword.ASYNC], // b???t ?????ng b???
  [/^\b(await|ch\u1EDD)\b/, Keyword.AWAIT], // ch???
  [/^\byield\b/, Keyword.YIELD],
  [/^\bimplements\b/, Keyword.IMPLEMENTS], // ??p d???ng
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
  [
    new RegExp(`^[a-zA-Z${vietnameseUnicodeSet}]+(\\s[a-zA-Z${vietnameseUnicodeSet}]+)*`),
    Keyword.IDENTIFIER,
  ],
];
