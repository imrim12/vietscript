// Loads the same vscode-textmate + vscode-oniguruma engines VSCode uses and
// asserts that key VietScript constructs get the expected TextMate scopes.

import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadWASM, OnigScanner, OnigString } from 'vscode-oniguruma'
import { parseRawGrammar, Registry } from 'vscode-textmate'
import { beforeAll, describe, expect, it } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const extensionDir = resolve(__dirname, '../..')
const grammarPath = resolve(extensionDir, 'syntaxes/vietscript.tmLanguage.json')

let grammar: import('vscode-textmate').IGrammar

beforeAll(async () => {
  const require_ = createRequire(import.meta.url)
  const wasmBin = readFileSync(require_.resolve('vscode-oniguruma/release/onig.wasm'))
  await loadWASM(wasmBin.buffer)

  const grammarText = readFileSync(grammarPath, 'utf8')
  const registry = new Registry({
    onigLib: Promise.resolve({
      createOnigScanner: sources => new OnigScanner(sources),
      createOnigString: s => new OnigString(s),
    }),
    loadGrammar: async (scope) => {
      if (scope === 'source.vjs')
        return parseRawGrammar(grammarText, grammarPath)
      return null
    },
  })
  const loaded = await registry.loadGrammar('source.vjs')
  if (!loaded) throw new Error('source.vjs grammar failed to load')
  grammar = loaded
})

function scopesAt(line: string, text: string): Set<string> {
  const result = grammar.tokenizeLine(line, null)
  const idx = line.indexOf(text)
  if (idx === -1) throw new Error(`text ${JSON.stringify(text)} not in line ${JSON.stringify(line)}`)
  const matching = result.tokens.filter(t => t.startIndex < idx + text.length && t.endIndex > idx)
  return new Set(matching.flatMap(t => t.scopes))
}

const cases: Array<{ line: string, text: string, scope: string, label?: string }> = [
  // Keywords (Vietnamese aliases).
  { line: 'hằng số tên = "An"', text: 'hằng số', scope: 'storage.type.vjs' },
  { line: 'hàm chào() {}', text: 'hàm', scope: 'storage.type.vjs' },
  { line: 'biến đếm = 0', text: 'biến', scope: 'storage.type.vjs' },
  { line: 'nếu (x) {}', text: 'nếu', scope: 'keyword.control.vjs' },
  { line: 'không thì { y() }', text: 'không thì', scope: 'keyword.control.vjs' },
  { line: 'lặp (x của arr) {}', text: 'lặp', scope: 'keyword.control.vjs' },
  { line: 'lặp (x của arr) {}', text: 'của', scope: 'keyword.operator.word.vjs' },
  { line: 'thử {} bắt lỗi (e) {}', text: 'thử', scope: 'keyword.control.vjs' },
  { line: 'thử {} bắt lỗi (e) {}', text: 'bắt lỗi', scope: 'keyword.control.vjs' },
  { line: 'cuối cùng { z() }', text: 'cuối cùng', scope: 'keyword.control.vjs' },
  { line: 'báo lỗi e', text: 'báo lỗi', scope: 'keyword.control.vjs' },
  { line: 'trả về x', text: 'trả về', scope: 'keyword.control.vjs' },
  { line: 'lớp X {}', text: 'lớp', scope: 'storage.type.class.vjs' },
  { line: 'lớp Y kế thừa Z {}', text: 'kế thừa', scope: 'storage.type.class.vjs' },
  { line: 'sử dụng { ref } từ "vue"', text: 'sử dụng', scope: 'keyword.control.module.vjs' },
  { line: 'sử dụng { ref } từ "vue"', text: 'từ', scope: 'keyword.control.module.vjs' },
  { line: 'cho phép { x }', text: 'cho phép', scope: 'keyword.control.module.vjs' },
  { line: 'đây.tên = tên', text: 'đây', scope: 'variable.language.vjs' },
  { line: 'x === đúng', text: 'đúng', scope: 'constant.language.vjs' },
  { line: 'x === sai', text: 'sai', scope: 'constant.language.vjs' },
  { line: 'x === rỗng', text: 'rỗng', scope: 'constant.language.vjs' },
  { line: 'bất đồng bộ hàm f() {}', text: 'bất đồng bộ', scope: 'storage.modifier.vjs' },
  { line: 'chờ promise', text: 'chờ', scope: 'keyword.control.vjs' },
  { line: 'riêng tư field', text: 'riêng tư', scope: 'storage.modifier.vjs' },
  { line: '// một bình luận', text: '// một bình luận', scope: 'comment.line.double-slash.vjs' },
  { line: '"chuỗi"', text: '"', scope: 'string.quoted.double.vjs' },
  { line: '`template ${x}`', text: '`', scope: 'string.template.vjs' },
  { line: 'biến n = 42', text: '42', scope: 'constant.numeric.decimal.vjs' },

  // Function/class names get distinct scopes for theme colour.
  { line: 'createApp(App).mount("#app")', text: 'createApp', scope: 'entity.name.function.vjs' },
  { line: 'createApp(App).mount("#app")', text: 'mount', scope: 'entity.name.function.vjs' },
  { line: 'hàm tinhTong(a, b) {}', text: 'tinhTong', scope: 'entity.name.function.vjs' },
  { line: 'lớp HocSinh {}', text: 'HocSinh', scope: 'entity.name.type.class.vjs' },
  { line: 'new KhoaHoc(1, "x")', text: 'KhoaHoc', scope: 'entity.name.type.class.vjs' },
  { line: 'console.log(x)', text: 'log', scope: 'entity.name.function.vjs' },
]

describe('VietScript TextMate grammar', () => {
  for (const { line, text, scope, label } of cases) {
    it(label ?? `${JSON.stringify(text)} in ${JSON.stringify(line)} → ${scope}`, () => {
      const scopes = scopesAt(line, text)
      expect([...scopes]).toContain(scope)
    })
  }
})
