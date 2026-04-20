import antfu from '@antfu/eslint-config'
import pnpm from 'eslint-plugin-pnpm'
import * as jsoncParser from 'jsonc-eslint-parser'
import * as yamlParser from 'yaml-eslint-parser'

export default antfu(
  {
    type: 'lib',

    gitignore: true,

    stylistic: {
      indent: 2, // 4, or 'tab'
      quotes: 'single', // or 'double'
    },

    typescript: true,
    vue: true,
    pnpm: true,
    imports: true,

    jsonc: false,
    yaml: false,
  },
  {
    name: 'pnpm/package.json',
    files: [
      'package.json',
      '**/package.json',
    ],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      pnpm,
    },
    rules: {
      'pnpm/json-enforce-catalog': 'error',
      'pnpm/json-valid-catalog': 'error',
      'pnpm/json-prefer-workspace-settings': 'error',
    },
  },
  {
    name: 'pnpm/pnpm-workspace-yaml',
    files: ['pnpm-workspace.yaml'],
    languageOptions: {
      parser: yamlParser,
    },
    plugins: {
      pnpm,
    },
    rules: {
      'pnpm/yaml-no-unused-catalog-item': 'error',
      'pnpm/yaml-no-duplicate-catalog-item': 'error',
    },
  },
  {
    ignores: [
      '**/.claude/**',
      '**/.nx/**',
      '**/dist/**',
      '**/fixtures/**',
      '**/node_modules/**',
    ],
  },
)
