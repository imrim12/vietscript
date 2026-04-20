import type { Plugin } from 'vite'
import generateDefault from '@babel/generator'
import { Parser } from '@vietscript/parser'

const generate = (generateDefault as any).default ?? generateDefault

export default function vietScriptPlugin(): Plugin {
  return {
    name: 'vietscript-loader',

    transform(code: string, id: string) {
      if (!id.endsWith('.vjs'))
        return null

      const parser = new Parser()
      parser.filename = id
      const ast = parser.parse(code)
      const result = generate(ast, {
        sourceMaps: true,
        sourceFileName: id,
      })

      return {
        code: result.code,
        map: result.map,
      }
    },
  }
}
