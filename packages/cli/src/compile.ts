import generateDefault from '@babel/generator'
import { Parser, VietScriptError } from '@vietscript/parser'

const generate = (generateDefault as any).default ?? generateDefault

export interface CompileResult {
  code: string
  map?: any
}

export function compile(source: string, filename?: string): CompileResult {
  const parser = new Parser()
  parser.filename = filename
  const ast = parser.parse(source)
  const result = generate(ast, {
    sourceMaps: true,
    sourceFileName: filename,
  })
  return {
    code: result.code,
    map: result.map,
  }
}

export { VietScriptError }
