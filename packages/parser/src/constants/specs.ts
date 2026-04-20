import { Keyword, Spec } from "@vietscript/shared";

export const SpecIdentifier = [/^[A-Za-z\u00C0-\u1EF9]+(\s[A-Za-z\u00C0-\u1EF9]+)*/, Keyword.IDENTIFIER] as Spec;

export const Specs: Array<Spec> = [
  // --------------------------------------
  // Whitespace:
  [/^\s+/, null],

  // --------------------------------------
  // Comments:
  [/^\/\/.*/, null],
  [/^\/\*[\S\s]*?\*\//, null],

  // --------------------------------------
  // Symbols and delimiters (ordered longest-first to avoid prefix conflicts):
  [/^\[/, "["],
  [/^]/, "]"],
  [/^\(/, "("],
  [/^\)/, ")"],
  [/^{/, "{"],
  [/^}/, "}"],
  [/^;/, ";"],
  [/^,/, ","],
  [/^:/, ":"],
  [/^\.{3}/, "..."],
  [/^\.[\d_]+([eE][+-]?\d[\d_]*)?n?/, Keyword.NUMBER],
  [/^\./, "."],
  [/^#/, "#"],

  [/^>>>=/, ">>>="],
  [/^>>>/, ">>>"],
  [/^>>=/, ">>="],
  [/^>>/, ">>"],
  [/^<<=/, "<<="],
  [/^<</, "<<"],
  [/^<=/, "<="],
  [/^>=/, ">="],
  [/^</, "<"],
  [/^>/, ">"],

  [/^===/, "==="],
  [/^!==/, "!=="],
  [/^==/, "=="],
  [/^!=/, "!="],

  [/^=>/, "=>"],
  [/^\*\*=/, "**="],
  [/^\*\*/, "**"],
  [/^\*=/, "*="],
  [/^\*/, "*"],
  [/^\+\+/, "++"],
  [/^\+=/, "+="],
  [/^\+/, "+"],
  [/^--/, "--"],
  [/^-=/, "-="],
  [/^-/, "-"],
  [/^\/=/, "/="],
  [/^\//, "/"],
  [/^%=/, "%="],
  [/^%/, "%"],

  [/^&&=/, "&&="],
  [/^&&/, "&&"],
  [/^&=/, "&="],
  [/^&/, "&"],
  [/^\|\|=/, "||="],
  [/^\|\|/, "||"],
  [/^\|=/, "|="],
  [/^\|/, "|"],
  [/^\^=/, "^="],
  [/^\^/, "^"],
  [/^~/, "~"],
  [/^!/, "!"],

  [/^\?\?=/, "??="],
  [/^\?\?/, "??"],
  [/^\?\./, "?."],
  [/^\?/, "?"],

  [/^=/, "="],

  // --------------------------------------
  // Keywords
  [/^\b(var|khai b\u00E1o)\b/, Keyword.VAR],
  [/^\b(break|ph\u00E1 v\u00F2ng l\u1EB7p)\b/, Keyword.BREAK],
  [/^\b(do|th\u1EF1c hi\u1EC7n)\b/, Keyword.DO],
  [/^\b(instanceof|l\u00E0 ki\u1EC3u)\b/, Keyword.INSTANCEOF],
  [/^\b(typeof|ki\u1EC3u c\u1EE7a)\b/, Keyword.TYPEOF],
  [/^\b(switch|duy\u1EC7t)\b/, Keyword.SWITCH],
  [/^\b(case|tr\u01B0\u1EDDng h\u1EE3p)\b/, Keyword.CASE],
  [/^\b(if|n\u1EBFu)\b/, Keyword.IF],
  [/^\b(else|kh\u00F4ng th\u00EC)/, Keyword.ELSE],
  [/^\bnew\b/, Keyword.NEW],
  [/^\b(catch|b\u1EAFt l\u1ED7i)\b/, Keyword.CATCH],
  [/^\b(finally|cu\u1ED1i c\u00F9ng)\b/, Keyword.FINALLY],
  [/^\b(return|tr\u1EA3 v\u1EC1)/, Keyword.RETURN],
  [/^\bvoid\b/, Keyword.VOID],
  [/^\b(continue|ti\u1EBFp t\u1EE5c)\b/, Keyword.CONTINUE],
  [/^\b(for|l\u1EB7p)\b/, Keyword.FOR],
  [/^\b(while|khi m\u00E0)\b/, Keyword.WHILE],
  [/^\bdebugger\b/, Keyword.DEBUGGER],
  [/^\b(function|h\u00E0m)\b/, Keyword.FUNCTION],
  [/^(this\b|\u0111\u00E2y\b)/, Keyword.THIS],
  [/^\bwith\b/, Keyword.WITH],
  [/^\b(default|m\u1EB7c \u0111\u1ECBnh)\b/, Keyword.DEFAULT],
  [/^\b(throw|b\u00E1o l\u1ED7i)\b/, Keyword.THROW],
  [/^\b(delete|xo\u00E1)\b/, Keyword.DELETE],
  [/^\b(in|trong)\b/, Keyword.IN],
  [/^\b(of|c\u1EE7a)\b/, Keyword.OF],
  [/^\b(try|th\u1EED)/, Keyword.TRY],
  [new RegExp("^\\b(as|như là)"), Keyword.AS],
  [new RegExp("^\\b(from|từ)"), Keyword.FROM],

  // --------------------------------------
  // Future Reserved Words
  [/^const|h\u1EB1ng s\u1ED1/, Keyword.CONST],
  [/^\b(class|l\u1EDBp)\b/, Keyword.CLASS],
  [/^\b(super|kh\u1EDFi t\u1EA1o cha)\b/, Keyword.SUPER],
  [/^\b(constructor|kh\u1EDFi t\u1EA1o)\b/, Keyword.CONSTRUCTOR],
  [/^\b(extends|k\u1EBF th\u1EEBa)\b/, Keyword.EXTENDS],
  [/^\b(export|cho ph\u00E9p)\b/, Keyword.EXPORT],
  [/^\b(import|s\u1EED d\u1EE5ng)\b/, Keyword.IMPORT],
  [/^\b(async|b\u1EA5t \u0111\u1ED3ng b\u1ED9)/, Keyword.ASYNC],
  [/^(await\b|ch\u1EDD(?![A-Za-z\u00C0-\u1EF9]))/, Keyword.AWAIT],
  [/^\b(yield|nh\u01B0\u1EDDng)\b/, Keyword.YIELD],
  [/^\b(let|bi\u1EBFn)\b/, Keyword.LET],
  [/^(private\b|ri\u00EAng t\u01B0(?![A-Za-z\u00C0-\u1EF9]))/, Keyword.PRIVATE],
  [/^\b(public|c\u00F4ng khai)\b/, Keyword.PUBLIC],
  [/^(protected\b|b\u1EA3o v\u1EC7(?![A-Za-z\u00C0-\u1EF9]))/, Keyword.PROTECTED],
  [/^\b(static|t\u0129nh)\b/, Keyword.STATIC],
  [/^\b(get|l\u1EA5y)\b/, Keyword.GET],
  [/^\b(set|g\u00E1n)\b/, Keyword.SET],

  // --------------------------------------
  // Numbers (order matters: hex/oct/bin before decimal):
  [/^0[xX][0-9a-fA-F][0-9a-fA-F_]*n?/, Keyword.NUMBER],
  [/^0[oO][0-7][0-7_]*n?/, Keyword.NUMBER],
  [/^0[bB][01][01_]*n?/, Keyword.NUMBER],
  [/^(\d[\d_]*(\.[\d_]*)?|\.[\d_]+)([eE][+-]?\d[\d_]*)?n?/, Keyword.NUMBER],

  // --------------------------------------
  // Strings (with escape support):
  [/^"(?:\\[\s\S]|[^"\\])*"/, Keyword.STRING],
  [/^'(?:\\[\s\S]|[^'\\])*'/, Keyword.STRING],

  // --------------------------------------
  // Literal with Keyword:
  [/^\b(null|r\u1ED7ng)\b/, Keyword.NULL],
  [/^\bNaN\b/, Keyword.NAN],
  [/^\b(Infinity|v\u00F4 c\u1EF1c)\b/, Keyword.INFINITY],
  [/^\b(undefined|kh\u00F4ng x\u00E1c \u0111\u1ECBnh)\b/, Keyword.UNDEFINED],
  [/(true|false|\u0111\u00FAng|sai)\b/, Keyword.BOOLEAN],

  // --------------------------------------
  // Identifier
  SpecIdentifier,
];
