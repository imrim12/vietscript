import type { Plugin } from 'vite'
import generateDefault from '@babel/generator'
import { Parser } from '@vietscript/parser'

const generate = (generateDefault as any).default ?? generateDefault

interface Compiled {
  code: string
  map: any
}

function compileVjs(code: string, id: string): Compiled {
  const parser = new Parser()
  parser.filename = id
  const ast = parser.parse(code)
  return generate(ast, {
    sourceMaps: true,
    sourceFileName: id,
  })
}

const SCRIPT_BLOCK_RE = /<script(\s[^>]*)?>([\s\S]*?)<\/script\s*>/g
const VJS_LANG_RE = /\blang\s*=\s*("vjs"|'vjs')/

function rewriteVueSfc(source: string, id: string): string | null {
  let touched = false
  const out = source.replace(SCRIPT_BLOCK_RE, (full, attrs: string | undefined, body: string) => {
    if (!attrs || !VJS_LANG_RE.test(attrs))
      return full
    touched = true
    const compiled = compileVjs(body, id)
    const newAttrs = attrs.replace(VJS_LANG_RE, 'lang="js"')
    return `<script${newAttrs}>\n${compiled.code}\n</script>`
  })
  return touched ? out : null
}

function stripQuery(id: string): string {
  const q = id.indexOf('?')
  return q === -1 ? id : id.slice(0, q)
}

export default function vietScriptPlugin(): Plugin {
  return {
    name: 'vietscript-loader',
    enforce: 'pre',

    transform(code: string, id: string) {
      const cleanId = stripQuery(id)

      if (cleanId.endsWith('.vue')) {
        const transformed = rewriteVueSfc(code, id)
        if (transformed === null)
          return null
        return { code: transformed, map: null }
      }

      if (cleanId.endsWith('.vjs')) {
        const result = compileVjs(code, id)
        return { code: result.code, map: result.map }
      }

      return null
    },
  }
}
