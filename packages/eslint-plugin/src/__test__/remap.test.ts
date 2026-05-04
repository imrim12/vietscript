// Verify the processor pipeline: VietScript parse-error position is preserved
// from the parser, and ESLint rule messages get their line/column anchored
// onto the original .vjs / .vue source via the identifier-lookup fallback.

import { Linter } from 'eslint'
import { describe, expect, it } from 'vitest'
import { vjsProcessor } from '../processors/vjs'
import { vueProcessor } from '../processors/vue'

const plugin = {
  meta: { name: 'eslint-plugin-vietscript', version: 'test' },
  processors: { vjs: vjsProcessor, vue: vueProcessor },
}

const linter = new Linter()

const vjsConfig = [
  {
    files: ['**/*.vjs'],
    plugins: { vietscript: plugin },
    processor: 'vietscript/vjs',
  },
  {
    files: ['**/*.vjs/*.js'],
    rules: { 'no-undef': 'error', 'no-unused-vars': 'warn' },
  },
]

const vueConfig = [
  {
    files: ['**/*.vue'],
    plugins: { vietscript: plugin },
    processor: 'vietscript/vue',
  },
  {
    files: ['**/*.vue/*.js'],
    rules: { 'no-undef': 'error' },
  },
]

describe('vjs processor', () => {
  it('reports parse errors at the parser-reported line/column', () => {
    const messages = linter.verify('\n\nhằng số x = ((((\n', vjsConfig, { filename: 'broken.vjs' })
    expect(messages).toHaveLength(1)
    expect(messages[0].ruleId).toBe('vietscript/parse-error')
    expect(messages[0].fatal).toBe(true)
    expect(messages[0].line).toBe(3)
    expect(messages[0].column).toBe(14)
  })

  it('anchors no-undef on the identifier in the .vjs source', () => {
    const src = 'lớp Con Mèo (Động Vật) {\n  nói() { trả về "x" }\n}\n'
    const messages = linter.verify(src, vjsConfig, { filename: 'sample.vjs' })
    const undef = messages.find(m => m.ruleId === 'no-undef')
    expect(undef).toBeDefined()
    expect(undef!.line).toBe(1)
    // "Động Vật" starts at column 14 (1-indexed) in the source line.
    expect(undef!.column).toBe(14)
    // 8 chars: Đ-ộ-n-g-space-V-ậ-t.
    expect(undef!.endColumn).toBe(22)
  })

  it('drops fix/suggestions because their offsets refer to compiled JS', () => {
    const src = 'hằng số unused = 1\n'
    const messages = linter.verify(src, vjsConfig, { filename: 'unused.vjs' })
    const unused = messages.find(m => m.ruleId === 'no-unused-vars')
    if (unused) {
      expect(unused.fix).toBeUndefined()
      expect(unused.suggestions).toBeUndefined()
    }
  })
})

describe('vue processor', () => {
  it('offsets parse errors by where the script block opens', () => {
    const src
      = '<template><div></div></template>\n'
      + '\n'
      + '<script setup lang="vjs">\n'
      + '\n'
      + 'hằng số x = ((((\n'
      + '</script>\n'
    const messages = linter.verify(src, vueConfig, { filename: 'Broken.vue' })
    const parseErr = messages.find(m => m.ruleId === 'vietscript/parse-error')
    expect(parseErr).toBeDefined()
    // `<script ...>` is on line 3, content starts on line 4 (the blank), then
    // line 5 has `hằng số x = ((((`. The error column is at byte 14 of that line.
    expect(parseErr!.line).toBe(5)
    expect(parseErr!.column).toBe(14)
  })

  it('anchors no-undef on the identifier inside the script block', () => {
    const src
      = '<template><div></div></template>\n'
      + '\n'
      + '<script setup lang="vjs">\n'
      + 'hằng số count = unknownThing\n'
      + '</script>\n'
    const messages = linter.verify(src, vueConfig, { filename: 'App.vue' })
    const undef = messages.find(m => m.ruleId === 'no-undef')
    expect(undef).toBeDefined()
    // The script-tag-end `>` is on line 3 col 26; vjs body line 1 starts there.
    // But `unknownThing` is on the NEXT line of vjs (line 2 of body) which
    // maps to line 4 of the .vue file.
    expect(undef!.line).toBe(4)
    // "unknownThing" starts at column 17 within line 4: "hằng số count = unknownThing"
    // h-ằ-n-g- -s-ố- -c-o-u-n-t- -=- = 16 chars, so `u` is at column 17.
    expect(undef!.column).toBe(17)
  })

  it('handles multiple script blocks independently', () => {
    const src
      = '<script lang="vjs">hằng số a = 1</script>\n'
      + '<template><div /></template>\n'
      + '<script setup lang="vjs">\nhằng số b = ((((</script>\n'
    const messages = linter.verify(src, vueConfig, { filename: 'Multi.vue' })
    const parseErr = messages.find(m => m.ruleId === 'vietscript/parse-error')
    expect(parseErr).toBeDefined()
    // The broken `((((` lives in the second script block, on line 4.
    expect(parseErr!.line).toBe(4)
  })
})
