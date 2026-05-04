import generateDefault from '@babel/generator'
import { originalPositionFor, TraceMap } from '@jridgewell/trace-mapping'
import { VietScriptError, Parser as VjsParser } from '@vietscript/parser'
import * as espree from 'espree'

const generate = (generateDefault as any).default ?? generateDefault

interface LocPoint { line: number, column: number }
interface Loc { start: LocPoint, end: LocPoint }

interface ParseOptions {
  filePath?: string
  ecmaVersion?: number | 'latest'
  sourceType?: 'module' | 'script' | 'commonjs'
  ecmaFeatures?: Record<string, boolean>
  range?: boolean
  loc?: boolean
  comment?: boolean
  tokens?: boolean
}

interface ParseResult {
  ast: any
  services?: Record<string, unknown>
  scopeManager?: unknown
  visitorKeys?: Record<string, string[]>
}

function compileVjs(text: string, filePath: string): { code: string, map: any } {
  const parser = new VjsParser()
  parser.filename = filePath
  const ast = parser.parse(text)
  return generate(ast, {
    sourceMaps: true,
    sourceFileName: filePath,
  })
}

function buildLineOffsets(text: string): number[] {
  const offsets: number[] = [0]
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) === 10) {
      offsets.push(i + 1)
    }
  }
  return offsets
}

function offsetForLineColumn(lineOffsets: number[], line: number, column: number): number {
  if (line < 1)
    return column
  const idx = line - 1
  const base = idx < lineOffsets.length ? lineOffsets[idx] : lineOffsets[lineOffsets.length - 1]
  return base + column
}

interface Mapper {
  loc: (point: LocPoint) => LocPoint
  range: (line: number, column: number) => number
}

function makeMapper(tracer: TraceMap, lineOffsets: number[]): Mapper {
  const cache = new Map<string, LocPoint>()
  function lookup(point: LocPoint): LocPoint {
    const key = `${point.line}:${point.column}`
    const cached = cache.get(key)
    if (cached !== undefined)
      return cached
    const original = originalPositionFor(tracer, { line: point.line, column: point.column })
    const result: LocPoint = (original.line == null)
      ? { line: 1, column: 0 }
      : { line: original.line, column: original.column ?? 0 }
    cache.set(key, result)
    return result
  }
  return {
    loc: lookup,
    range(line: number, column: number) {
      const orig = lookup({ line, column })
      return offsetForLineColumn(lineOffsets, orig.line, orig.column)
    },
  }
}

const VISITOR_KEYS_TO_SKIP = new Set(['type', 'loc', 'range', 'start', 'end', 'parent', 'comments', 'tokens'])

function remapNode(node: any, mapper: Mapper): void {
  if (node === null || typeof node !== 'object')
    return
  if (Array.isArray(node)) {
    for (const child of node) remapNode(child, mapper)
    return
  }
  if (typeof node.type === 'string') {
    if (node.loc) {
      const start = mapper.loc(node.loc.start)
      const end = mapper.loc(node.loc.end)
      node.loc = { start, end }
    }
  }
  for (const key of Object.keys(node)) {
    if (VISITOR_KEYS_TO_SKIP.has(key))
      continue
    const child = node[key]
    if (child && typeof child === 'object')
      remapNode(child, mapper)
  }
}

function recomputeRanges(node: any, lineOffsets: number[]): void {
  if (node === null || typeof node !== 'object')
    return
  if (Array.isArray(node)) {
    for (const child of node) recomputeRanges(child, lineOffsets)
    return
  }
  if (typeof node.type === 'string' && node.loc) {
    const startOffset = offsetForLineColumn(lineOffsets, node.loc.start.line, node.loc.start.column)
    const endOffset = offsetForLineColumn(lineOffsets, node.loc.end.line, node.loc.end.column)
    if (Array.isArray(node.range))
      node.range = [startOffset, endOffset]
    else
      node.range = [startOffset, endOffset]
    node.start = startOffset
    node.end = endOffset
  }
  for (const key of Object.keys(node)) {
    if (VISITOR_KEYS_TO_SKIP.has(key))
      continue
    const child = node[key]
    if (child && typeof child === 'object')
      recomputeRanges(child, lineOffsets)
  }
}

function buildErrorAst(text: string, error: VietScriptError): any {
  const lineOffsets = buildLineOffsets(text)
  return {
    type: 'Program',
    body: [],
    sourceType: 'module',
    comments: [],
    tokens: [],
    range: [0, text.length],
    loc: {
      start: { line: 1, column: 0 },
      end: {
        line: lineOffsets.length,
        column: text.length - lineOffsets[lineOffsets.length - 1],
      },
    },
  }
}

export function parse(text: string, options: ParseOptions = {}): any {
  return parseForESLint(text, options).ast
}

export function parseForESLint(text: string, options: ParseOptions = {}): ParseResult {
  const filePath = options.filePath ?? '<input>.vjs'
  let compiled: { code: string, map: any }
  try {
    compiled = compileVjs(text, filePath)
  }
  catch (e) {
    if (e instanceof VietScriptError) {
      const err: any = new SyntaxError(e.message)
      err.lineNumber = e.line ?? 1
      err.column = e.column ?? 1
      throw err
    }
    throw e
  }

  const espreeAst = (espree as any).parse(compiled.code, {
    ecmaVersion: options.ecmaVersion ?? 'latest',
    sourceType: options.sourceType ?? 'module',
    ecmaFeatures: options.ecmaFeatures,
    loc: true,
    range: true,
    comment: true,
    tokens: true,
  })

  const tracer = new TraceMap(compiled.map as any)
  const originalLineOffsets = buildLineOffsets(text)
  const mapper = makeMapper(tracer, originalLineOffsets)

  remapNode(espreeAst, mapper)
  if (Array.isArray(espreeAst.tokens)) {
    for (const tok of espreeAst.tokens) {
      if (tok.loc) {
        tok.loc = {
          start: mapper.loc(tok.loc.start),
          end: mapper.loc(tok.loc.end),
        }
      }
    }
  }
  if (Array.isArray(espreeAst.comments)) {
    for (const c of espreeAst.comments) {
      if (c.loc) {
        c.loc = {
          start: mapper.loc(c.loc.start),
          end: mapper.loc(c.loc.end),
        }
      }
    }
  }
  recomputeRanges(espreeAst, originalLineOffsets)
  if (Array.isArray(espreeAst.tokens)) {
    for (const tok of espreeAst.tokens) {
      if (tok.loc) {
        tok.range = [
          offsetForLineColumn(originalLineOffsets, tok.loc.start.line, tok.loc.start.column),
          offsetForLineColumn(originalLineOffsets, tok.loc.end.line, tok.loc.end.column),
        ]
      }
    }
  }
  if (Array.isArray(espreeAst.comments)) {
    for (const c of espreeAst.comments) {
      if (c.loc) {
        c.range = [
          offsetForLineColumn(originalLineOffsets, c.loc.start.line, c.loc.start.column),
          offsetForLineColumn(originalLineOffsets, c.loc.end.line, c.loc.end.column),
        ]
      }
    }
  }

  espreeAst.range = [0, text.length]
  espreeAst.loc = {
    start: { line: 1, column: 0 },
    end: {
      line: originalLineOffsets.length,
      column: text.length - originalLineOffsets[originalLineOffsets.length - 1],
    },
  }

  return { ast: espreeAst }
}

export const meta = {
  name: 'eslint-plugin-vietscript/parser',
  version: '1.0.0-beta.1',
}

export default {
  parse,
  parseForESLint,
  meta,
}

// Make `buildErrorAst` available — currently unused but kept for future
// "graceful parse-failure" path that returns an empty Program with diagnostics
// instead of throwing.
export { buildErrorAst }
