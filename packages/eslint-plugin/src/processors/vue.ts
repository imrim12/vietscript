import generateDefault from '@babel/generator'
import { originalPositionFor, TraceMap } from '@jridgewell/trace-mapping'
import { VietScriptError, Parser as VjsParser } from '@vietscript/parser'

const generate = (generateDefault as any).default ?? generateDefault

export interface PreprocessedFile {
  text: string
  filename: string
}

export interface LintMessage {
  ruleId: string | null
  severity: 1 | 2
  message: string
  line: number
  column: number
  endLine?: number
  endColumn?: number
  fatal?: true
  fix?: { range: [number, number], text: string }
  suggestions?: any[]
}

const SCRIPT_BLOCK_RE = /<script(\s[^>]*)?>([\s\S]*?)<\/script\s*>/g
const VJS_LANG_RE = /\blang\s*=\s*("vjs"|'vjs')/

interface ScriptBlock {
  body: string
  bodyStart: number
  bodyStartLine: number
  bodyStartColumn: number
}

function findVjsBlocks(source: string): ScriptBlock[] {
  const blocks: ScriptBlock[] = []
  SCRIPT_BLOCK_RE.lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = SCRIPT_BLOCK_RE.exec(source)) !== null) {
    const attrs = match[1] ?? ''
    const body = match[2] ?? ''
    if (!VJS_LANG_RE.test(attrs))
      continue
    const fullStart = match.index
    const tagOpenEnd = source.indexOf('>', fullStart)
    const bodyStart = tagOpenEnd === -1 ? fullStart : tagOpenEnd + 1
    const { line, column } = offsetToLineColumn(source, bodyStart)
    blocks.push({ body, bodyStart, bodyStartLine: line, bodyStartColumn: column })
  }
  return blocks
}

function compileBlock(body: string, filename: string): { code: string, map: any, error: VietScriptError | null } {
  try {
    const parser = new VjsParser()
    parser.filename = filename
    const ast = parser.parse(body)
    const out = generate(ast, { sourceMaps: true, sourceFileName: filename })
    return { code: out.code, map: out.map, error: null }
  }
  catch (e) {
    if (e instanceof VietScriptError) {
      return { code: '', map: null, error: e }
    }
    throw e
  }
}

function offsetToLineColumn(text: string, offset: number): { line: number, column: number } {
  let line = 1
  let lineStart = 0
  for (let i = 0; i < offset && i < text.length; i++) {
    if (text.charCodeAt(i) === 10) {
      line++
      lineStart = i + 1
    }
  }
  return { line, column: offset - lineStart }
}

interface BlockState {
  block: ScriptBlock
  tracer: TraceMap | null
  parseError: VietScriptError | null
}

interface ProcessorState {
  source: string
  blocks: BlockState[]
}

const stateByFilename = new Map<string, ProcessorState>()

function quotedIdentifier(message: string): string | null {
  const m = message.match(/['"`]([A-Za-zÀ-ỹ_$][A-Za-zÀ-ỹ0-9_$]*)['"`]/u)
  return m ? m[1] : null
}

interface BlockPos { line: number, column: number, endLine: number, endColumn: number }

// Locate an identifier in the script-block body. Mirrors vjs.ts; multi-word
// vjs identifiers are flattened to `_`-joined names in the compiled JS, so
// also try the space-separated form when looking up.
function findInBlock(body: string, name: string): BlockPos | null {
  const candidates = [name]
  if (name.includes('_')) candidates.push(name.replace(/_/g, ' '))
  for (const needle of candidates) {
    const re = new RegExp(`(?<![A-Za-zÀ-ỹ_$0-9])${needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![A-Za-zÀ-ỹ_$0-9])`, 'u')
    const m = re.exec(body)
    if (!m) continue
    const offset = m.index
    let line = 1
    let lineStart = 0
    for (let i = 0; i < offset; i++) {
      if (body.charCodeAt(i) === 10) { line++; lineStart = i + 1 }
    }
    const column = offset - lineStart + 1
    let endLine = line
    let endLineStart = lineStart
    for (let i = offset; i < offset + needle.length; i++) {
      if (body.charCodeAt(i) === 10) { endLine++; endLineStart = i + 1 }
    }
    const endColumn = (offset + needle.length) - endLineStart + 1
    return { line, column, endLine, endColumn }
  }
  return null
}

function blockToFile(blockState: BlockState, line: number, column: number): { line: number, column: number } {
  const fileLine = blockState.block.bodyStartLine + (line - 1)
  const fileColumn = line === 1
    ? blockState.block.bodyStartColumn + (column - 1) + 1
    : column
  return { line: fileLine, column: fileColumn }
}

// Translate a lint message that came from compiled JS for a single block
// back onto the .vue file. Sourcemap is sparse because the parser doesn't
// track AST positions, so we fall back to "find the quoted identifier in
// the block source" — that catches all identifier-anchored rules.
function remapMessage(msg: LintMessage, blockState: BlockState): LintMessage {
  const result: LintMessage = { ...msg }
  stripFixes(result)

  // 1. Sourcemap (currently empty until parser tracks loc).
  if (blockState.tracer) {
    const start = originalPositionFor(blockState.tracer, { line: msg.line, column: Math.max(0, msg.column - 1) })
    if (start.line != null && start.line !== 1) {
      const startInFile = blockToFile(blockState, start.line, (start.column ?? 0) + 1)
      result.line = startInFile.line
      result.column = startInFile.column
      if (msg.endLine != null && msg.endColumn != null) {
        const end = originalPositionFor(blockState.tracer, { line: msg.endLine, column: Math.max(0, msg.endColumn - 1) })
        if (end.line != null) {
          const endInFile = blockToFile(blockState, end.line, (end.column ?? 0) + 1)
          result.endLine = endInFile.line
          result.endColumn = endInFile.column
        }
      }
      return result
    }
  }

  // 2. Identifier-anchor fallback.
  const ident = quotedIdentifier(msg.message)
  if (ident) {
    const pos = findInBlock(blockState.block.body, ident)
    if (pos) {
      const startInFile = blockToFile(blockState, pos.line, pos.column)
      const endInFile = blockToFile(blockState, pos.endLine, pos.endColumn)
      result.line = startInFile.line
      result.column = startInFile.column
      result.endLine = endInFile.line
      result.endColumn = endInFile.column
      return result
    }
  }

  // 3. Last resort: offset compiled-JS coords by where the block opens.
  const startInFile = blockToFile(blockState, msg.line, msg.column)
  result.line = startInFile.line
  result.column = startInFile.column
  if (msg.endLine != null && msg.endColumn != null) {
    const endInFile = blockToFile(blockState, msg.endLine, msg.endColumn)
    result.endLine = endInFile.line
    result.endColumn = endInFile.column
  }
  return result
}

function stripFixes(msg: LintMessage): void {
  if (msg.fix) delete msg.fix
  if (msg.suggestions) delete msg.suggestions
}

export const vueProcessor = {
  meta: {
    name: 'eslint-plugin-vietscript/vue-processor',
    version: '1.0.0-beta.1',
  },
  supportsAutofix: false,

  preprocess(text: string, filename: string): Array<PreprocessedFile | string> {
    const blocks = findVjsBlocks(text)
    const blockStates: BlockState[] = []
    const out: Array<PreprocessedFile | string> = []

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i]
      const compiled = compileBlock(block.body, filename)
      const tracer = compiled.map ? new TraceMap(compiled.map) : null
      blockStates.push({ block, tracer, parseError: compiled.error })
      out.push({ text: compiled.error ? '' : compiled.code, filename: `${i}.js` })
    }

    stateByFilename.set(filename, { source: text, blocks: blockStates })
    return out
  },

  postprocess(messages: LintMessage[][], filename: string): LintMessage[] {
    const state = stateByFilename.get(filename)
    stateByFilename.delete(filename)
    const result: LintMessage[] = []

    if (!state) {
      for (const msgs of messages) result.push(...msgs)
      return result
    }

    for (let i = 0; i < state.blocks.length; i++) {
      const blockState = state.blocks[i]

      if (blockState.parseError) {
        const e = blockState.parseError
        const errorLine = e.line ?? 1
        const errorColumn = e.column ?? 1
        const absoluteLine = blockState.block.bodyStartLine + (errorLine - 1)
        const absoluteColumn = errorLine === 1
          ? blockState.block.bodyStartColumn + errorColumn
          : errorColumn
        result.push({
          ruleId: 'vietscript/parse-error',
          severity: 2,
          message: e.message,
          line: absoluteLine,
          column: absoluteColumn,
          fatal: true,
        })
      }

      const blockMessages = messages[i] ?? []
      for (const msg of blockMessages) {
        result.push(remapMessage(msg, blockState))
      }
    }

    return result
  },
}

export default vueProcessor
