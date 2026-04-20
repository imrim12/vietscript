import type { Spec } from '@vietscript/shared'
import { Keyword } from '@vietscript/shared'

export const SpecIdentifier = [/^[A-Za-z\u00C0-\u1EF9][A-Za-z0-9\u00C0-\u1EF9]*(\s[A-Za-z\u00C0-\u1EF9][A-Za-z0-9\u00C0-\u1EF9]*)*/, Keyword.IDENTIFIER] as Spec

export const Specs: Array<Spec> = [
  // --------------------------------------
  // Whitespace:
  [/^\s+/, null],

  // --------------------------------------
  // Comments:
  [/^\/\/.*/, null],
  [/^\/\*[\s\S]*?\*\//, null],

  // --------------------------------------
  // Symbols and delimiters (ordered longest-first to avoid prefix conflicts):
  [/^\[/, '['],
  [/^\]/, ']'],
  [/^\(/, '('],
  [/^\)/, ')'],
  [/^\{/, '{'],
  [/^\}/, '}'],
  [/^;/, ';'],
  [/^,/, ','],
  [/^:/, ':'],
  [/^\.{3}/, '...'],
  [/^\.[\d_]+([eE][+-]?\d[\d_]*)?n?/, Keyword.NUMBER],
  [/^\./, '.'],
  [/^#/, '#'],

  [/^>>>=/, '>>>='],
  [/^>>>/, '>>>'],
  [/^>>=/, '>>='],
  [/^>>/, '>>'],
  [/^<<=/, '<<='],
  [/^<</, '<<'],
  [/^<=/, '<='],
  [/^>=/, '>='],
  [/^</, '<'],
  [/^>/, '>'],

  [/^===/, '==='],
  [/^!==/, '!=='],
  [/^==/, '=='],
  [/^!=/, '!='],

  [/^=>/, '=>'],
  [/^\*\*=/, '**='],
  [/^\*\*/, '**'],
  [/^\*=/, '*='],
  [/^\*/, '*'],
  [/^\+\+/, '++'],
  [/^\+=/, '+='],
  [/^\+/, '+'],
  [/^--/, '--'],
  [/^-=/, '-='],
  [/^-/, '-'],
  [/^\/=/, '/='],
  [/^\//, '/'],
  [/^%=/, '%='],
  [/^%/, '%'],

  [/^&&=/, '&&='],
  [/^&&/, '&&'],
  [/^&=/, '&='],
  [/^&/, '&'],
  [/^\|\|=/, '||='],
  [/^\|\|/, '||'],
  [/^\|=/, '|='],
  [/^\|/, '|'],
  [/^\^=/, '^='],
  [/^\^/, '^'],
  [/^~/, '~'],
  [/^!/, '!'],

  [/^\?\?=/, '??='],
  [/^\?\?/, '??'],
  [/^\?\./, '?.'],
  [/^\?/, '?'],

  [/^=/, '='],

  // --------------------------------------
  // Keywords
  [/^(var|khai b\u00E1o)\b/, Keyword.VAR],
  [/^(break|ph\u00E1 v\u00F2ng l\u1EB7p)\b/, Keyword.BREAK],
  [/^(do|th\u1EF1c hi\u1EC7n)\b/, Keyword.DO],
  [/^(instanceof|l\u00E0 ki\u1EC3u)\b/, Keyword.INSTANCEOF],
  [/^(typeof|ki\u1EC3u c\u1EE7a)\b/, Keyword.TYPEOF],
  [/^(switch|duy\u1EC7t)\b/, Keyword.SWITCH],
  [/^(case|tr\u01B0\u1EDDng h\u1EE3p)\b/, Keyword.CASE],
  [/^(if|n\u1EBFu)\b/, Keyword.IF],
  [/^(else|kh\u00F4ng th\u00EC)/, Keyword.ELSE],
  [/^new\b/, Keyword.NEW],
  [/^(catch|b\u1EAFt l\u1ED7i)\b/, Keyword.CATCH],
  [/^(finally|cu\u1ED1i c\u00F9ng)\b/, Keyword.FINALLY],
  [/^(return|tr\u1EA3 v\u1EC1)/, Keyword.RETURN],
  [/^void\b/, Keyword.VOID],
  [/^(continue|ti\u1EBFp t\u1EE5c)\b/, Keyword.CONTINUE],
  [/^(for|l\u1EB7p)\b/, Keyword.FOR],
  [/^(while\b|khi m\u00E0(?![A-Za-z\u00C0-\u1EF9]))/, Keyword.WHILE],
  [/^debugger\b/, Keyword.DEBUGGER],
  [/^(function|h\u00E0m)\b/, Keyword.FUNCTION],
  [/^(this\b|\u0111\u00E2y\b)/, Keyword.THIS],
  [/^with\b/, Keyword.WITH],
  [/^(default|m\u1EB7c \u0111\u1ECBnh)\b/, Keyword.DEFAULT],
  [/^(throw|b\u00E1o l\u1ED7i)\b/, Keyword.THROW],
  [/^(delete\b|xo\u00E1(?![A-Za-z\u00C0-\u1EF9]))/, Keyword.DELETE],
  [/^(in|trong)\b/, Keyword.IN],
  [/^(of|c\u1EE7a)\b/, Keyword.OF],
  [/^(try|th\u1EED)/, Keyword.TRY],
  [/^(as|nh\u01B0 l\u00E0)/, Keyword.AS],
  [/^(from|t\u1EEB)/, Keyword.FROM],

  // --------------------------------------
  // Future Reserved Words
  [/^const|h\u1EB1ng s\u1ED1/, Keyword.CONST],
  [/^(class|l\u1EDBp)\b/, Keyword.CLASS],
  [/^(super|kh\u1EDFi t\u1EA1o cha)\b/, Keyword.SUPER],
  [/^(constructor|kh\u1EDFi t\u1EA1o)\b/, Keyword.CONSTRUCTOR],
  [/^(extends|k\u1EBF th\u1EEBa)\b/, Keyword.EXTENDS],
  [/^(export|cho ph\u00E9p)\b/, Keyword.EXPORT],
  [/^(import|s\u1EED d\u1EE5ng)\b/, Keyword.IMPORT],
  [/^(async|b\u1EA5t \u0111\u1ED3ng b\u1ED9)/, Keyword.ASYNC],
  [/^(await\b|ch\u1EDD(?![A-Za-z\u00C0-\u1EF9]))/, Keyword.AWAIT],
  [/^(yield|nh\u01B0\u1EDDng)\b/, Keyword.YIELD],
  [/^(let|bi\u1EBFn)\b/, Keyword.LET],
  [/^(private\b|ri\u00EAng t\u01B0(?![A-Za-z\u00C0-\u1EF9]))/, Keyword.PRIVATE],
  [/^(public|c\u00F4ng khai)\b/, Keyword.PUBLIC],
  [/^(protected\b|b\u1EA3o v\u1EC7(?![A-Za-z\u00C0-\u1EF9]))/, Keyword.PROTECTED],
  [/^(static|t\u0129nh)\b/, Keyword.STATIC],
  [/^(get|l\u1EA5y)\b/, Keyword.GET],
  [/^(set|g\u00E1n)\b/, Keyword.SET],

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
  [/^(null|r\u1ED7ng)\b/, Keyword.NULL],
  [/^NaN\b/, Keyword.NAN],
  [/^(Infinity|v\u00F4 c\u1EF1c)\b/, Keyword.INFINITY],
  [/^(undefined|kh\u00F4ng x\u00E1c \u0111\u1ECBnh)\b/, Keyword.UNDEFINED],
  [/(true|false|\u0111\u00FAng|sai)\b/, Keyword.BOOLEAN],

  // --------------------------------------
  // Identifier
  SpecIdentifier,
]
