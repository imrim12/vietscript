import * as parser from './parser'
import { vjsProcessor } from './processors/vjs'
import { vueProcessor } from './processors/vue'

const meta = {
  name: 'eslint-plugin-vietscript',
  version: '1.0.0-beta.1',
}

const plugin = {
  meta,
  parsers: {
    vjs: parser,
  },
  processors: {
    'vjs': vjsProcessor,
    '.vjs': vjsProcessor,
    'vue': vueProcessor,
    '.vue': vueProcessor,
  },
  rules: {},
  configs: {} as Record<string, unknown>,
}

// Stylistic rules judge whitespace, quote style, semicolons — choices the
// user can't control because they live in the babel-generated JS, not in the
// .vjs source. Turn them off on the virtual files that come out of the
// processor.
const styleOff = {
  'style/semi': 'off',
  'style/quotes': 'off',
  'style/eol-last': 'off',
  'style/comma-dangle': 'off',
  'style/quote-props': 'off',
  'style/indent': 'off',
  'style/no-tabs': 'off',
  'style/no-trailing-spaces': 'off',
  'style/no-multiple-empty-lines': 'off',
  'style/operator-linebreak': 'off',
  'style/object-curly-spacing': 'off',
  'style/arrow-parens': 'off',
  'style/brace-style': 'off',
  'style/padded-blocks': 'off',
  'style/space-infix-ops': 'off',
  'style/spaced-comment': 'off',
  'style/keyword-spacing': 'off',
  'style/space-before-function-paren': 'off',
  'style/semi-spacing': 'off',
  'style/comma-spacing': 'off',
  'style/key-spacing': 'off',
  'style/array-bracket-spacing': 'off',
  'style/block-spacing': 'off',
  'style/computed-property-spacing': 'off',
  'style/function-paren-newline': 'off',
  'style/function-call-spacing': 'off',
  'style/lines-between-class-members': 'off',
  'style/multiline-ternary': 'off',
  'style/no-mixed-operators': 'off',
  'style/no-multi-spaces': 'off',
  'style/space-in-parens': 'off',
  'style/template-curly-spacing': 'off',
  'style/jsx-quotes': 'off',
  'style/member-delimiter-style': 'off',
  'style/type-annotation-spacing': 'off',
  'antfu/top-level-function': 'off',
  'antfu/if-newline': 'off',
  'antfu/consistent-list-newline': 'off',
  'import/newline-after-import': 'off',
  'import/order': 'off',
  'unused-imports/no-unused-imports': 'off',
  'unused-imports/no-unused-vars': 'off',
}

const recommended = [
  {
    name: 'vietscript/vjs',
    files: ['**/*.vjs'],
    plugins: { vietscript: plugin },
    processor: 'vietscript/vjs',
  },
  {
    name: 'vietscript/vjs-virtual',
    files: ['**/*.vjs/*.js'],
    rules: styleOff,
  },
  {
    name: 'vietscript/vue-sfc',
    files: ['**/*.vue'],
    plugins: { vietscript: plugin },
    processor: 'vietscript/vue',
  },
  {
    name: 'vietscript/vue-virtual',
    files: ['**/*.vue/*.js'],
    rules: styleOff,
  },
]

plugin.configs.recommended = recommended
plugin.configs['flat/recommended'] = recommended

export default plugin
export { parser, vjsProcessor, vueProcessor }
