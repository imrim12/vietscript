/* eslint-disable no-useless-escape */
import * as monaco from 'monaco-editor-core'
import IRichLanguageConfiguration = monaco.languages.LanguageConfiguration
import ILanguage = monaco.languages.IMonarchLanguage
import { KEYWORDS } from './autocomplete'

export const richLanguageConfiguration: IRichLanguageConfiguration = {
  // If we want to support code folding, brackets ... ( [], (), {}....), we can override some properties here
  // check the doc
}

export const monarchLanguage = <ILanguage>{
  // Set defaultToken to invalid to see what you do not tokenize yet
  keywords: KEYWORDS,
  typeKeywords: ['boolean', 'double', 'byte', 'int', 'short', 'char', 'void', 'long', 'float'],
  operators: [
    '=',
    '>',
    '<',
    '!',
    '~',
    '?',
    ':',
    '==',
    '<=',
    '>=',
    '!=',
    '&&',
    '||',
    '++',
    '--',
    '+',
    '-',
    '*',
    '/',
    '&',
    '|',
    '^',
    '%',
    '<<',
    '>>',
    '>>>',
    '+=',
    '-=',
    '*=',
    '/=',
    '&=',
    '|=',
    '^=',
    '%=',
    '<<=',
    '>>=',
    '>>>='
  ],

  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  digits: /\d+(_+\d+)*/,
  octaldigits: /[0-7]+(_+[0-7]+)*/,
  binarydigits: /[0-1]+(_+[0-1]+)*/,
  hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

  regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
  regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,

  // The main tokenizer for our languages
  tokenizer: {
    root: [[/[{}]/, 'delimiter.bracket'], { include: 'common' }],
    common: [
      [/[A-Z][\w\$]*/, 'type.identifier'],

      // identifiers and keywords
      [
        /(khai\s+báo|hàm|trường\s+hợp|trả\s+về|duyệt|ngược\s+lại|nếu|bắt\s+lỗi|tạo\s+mới|cuối\s+cùng|trả\s+về|tiếp\s+tục|lặp|khi\s+mà|hàm|mặc\s+định|báo\s+lỗi|xoá|trong|từ|in\s+ra)/g,
        {
          cases: {
            '@typeKeywords': 'keyword',
            '@keywords': 'keyword',
            '@default': 'identifier'
          }
        }
      ],

      // whitespace
      { include: '@whitespace' },

      // delimiters and operators
      [/[()\[\]]/, '@brackets'],
      [/[<>](?!@symbols)/, '@brackets'],
      [
        /@symbols/,
        {
          cases: {
            '@operators': 'delimiter',
            '@default': ''
          }
        }
      ],
      // numbers
      [/(@digits)[eE]([\-+]?(@digits))?/, 'number.float'],
      [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, 'number.float'],
      [/0[xX](@hexdigits)/, 'number.hex'],
      [/0[oO]?(@octaldigits)/, 'number.octal'],
      [/0[bB](@binarydigits)/, 'number.binary'],
      [/(@digits)/, 'number'],

      // delimiter: after number because of .\d floats
      [/[;,.]/, 'delimiter'],
      // strings
      [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
      [/'([^'\\]|\\.)*$/, 'string.invalid'], // non-teminated string
      [/"/, 'string', '@string_double'],
      [/'/, 'string', '@string_single'],
      [/`/, 'string', '@string_backtick']
    ],
    comment: [
      [/[^\/*]+/, 'comment'],
      [/\/\*/, 'comment', '@push'], // nested comment
      ['\\*/', 'comment', '@pop'],
      [/[/*]/, 'comment']
    ],

    jsdoc: [
      [/[^\/*]+/, 'comment.doc'],
      [/\*\//, 'comment.doc', '@pop'],
      [/[\/*]/, 'comment.doc']
    ],

    whitespace: [
      [/[ \t\r\n]+/, ''],
      [/\/\*\*(?!\/)/, 'comment.doc', '@jsdoc'],
      [/\/\*/, 'comment', '@comment'],
      [/\/\/.*$/, 'comment']
    ],

    string: [
      [/[^\\"]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/"/, 'string', '@pop']
    ],

    string_double: [
      [/[^\\"]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/"/, 'string', '@pop']
    ],

    string_single: [
      [/[^\\']+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/'/, 'string', '@pop']
    ],

    string_backtick: [
      [/\$\{/, { token: 'delimiter.bracket', next: '@bracketCounting' }],
      [/[^\\`$]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/`/, 'string', '@pop']
    ],

    bracketCounting: [
      [/\{/, 'delimiter.bracket', '@bracketCounting'],
      [/\}/, 'delimiter.bracket', '@pop'],
      { include: 'common' }
    ]
  }
}
