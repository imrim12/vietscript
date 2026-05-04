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

interface State {
  source: string
  parseError: VietScriptError | null
  tracer: TraceMap | null
}

const stateByFile = new Map<string, State>()

function compile(text: string, filename: string): { code: string, map: any, error: VietScriptError | null } {
  try {
    const parser = new VjsParser()
    parser.filename = filename
    const ast = parser.parse(text)
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

// Pull the first quoted identifier out of a lint message ("'Foo' is not
// defined", "'bar' is assigned a value but never used", etc.). The character
// class allows Vietnamese letters because vjs identifiers like `Con_Mèo`
// flow through to ESLint messages verbatim.
function quotedIdentifier(message: string): string | null {
  const m = message.match(/['"`]([A-Za-zÀ-ỹ_$][A-Za-zÀ-ỹ0-9_$]*)['"`]/u)
  return m ? m[1] : null
}

interface Position { line: number, column: number, endLine: number, endColumn: number }

// Locate an identifier in the original source. The vjs parser flattens
// multi-word identifiers like `Động Vật` to `Động_Vật` in the JS output, so
// when looking up we also try the space-separated form.
function findInSource(source: string, name: string): Position | null {
  const candidates = [name]
  if (name.includes('_')) candidates.push(name.replace(/_/g, ' '))

  for (const needle of candidates) {
    const re = new RegExp(`(?<![A-Za-zÀ-ỹ_$0-9])${needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![A-Za-zÀ-ỹ_$0-9])`, 'u')
    const m = re.exec(source)
    if (!m) continue
    const offset = m.index
    let line = 1
    let lineStart = 0
    for (let i = 0; i < offset; i++) {
      if (source.charCodeAt(i) === 10) {
        line++
        lineStart = i + 1
      }
    }
    const column = offset - lineStart + 1
    let endLine = line
    let endLineStart = lineStart
    for (let i = offset; i < offset + needle.length; i++) {
      if (source.charCodeAt(i) === 10) {
        endLine++
        endLineStart = i + 1
      }
    }
    const endColumn = (offset + needle.length) - endLineStart + 1
    return { line, column, endLine, endColumn }
  }
  return null
}

function remapMessage(msg: LintMessage, source: string, tracer: TraceMap | null): LintMessage {
  const result: LintMessage = { ...msg }

  // 1. Try sourcemap (works once the parser tracks AST positions).
  if (tracer) {
    const start = originalPositionFor(tracer, { line: msg.line, column: Math.max(0, msg.column - 1) })
    if (start.line != null && start.line !== 1) {
      result.line = start.line
      result.column = (start.column ?? 0) + 1
      if (msg.endLine != null && msg.endColumn != null) {
        const end = originalPositionFor(tracer, { line: msg.endLine, column: Math.max(0, msg.endColumn - 1) })
        if (end.line != null) {
          result.endLine = end.line
          result.endColumn = (end.column ?? 0) + 1
        }
      }
      stripFixes(result)
      return result
    }
  }

  // 2. Pragmatic fallback: anchor on a quoted identifier in the message.
  const ident = quotedIdentifier(msg.message)
  if (ident) {
    const pos = findInSource(source, ident)
    if (pos) {
      result.line = pos.line
      result.column = pos.column
      result.endLine = pos.endLine
      result.endColumn = pos.endColumn
      stripFixes(result)
      return result
    }
  }

  stripFixes(result)
  return result
}

function stripFixes(msg: LintMessage): void {
  // Compiled-JS offsets are meaningless against the .vjs source. Dropping
  // them prevents `eslint --fix` from corrupting the file.
  if (msg.fix) delete msg.fix
  if (msg.suggestions) delete msg.suggestions
}

export const vjsProcessor = {
  meta: {
    name: 'eslint-plugin-vietscript/vjs-processor',
    version: '1.0.0-beta.1',
  },
  supportsAutofix: false,

  preprocess(text: string, filename: string): Array<PreprocessedFile> {
    const compiled = compile(text, filename)
    const tracer = compiled.map ? new TraceMap(compiled.map) : null
    stateByFile.set(filename, { source: text, parseError: compiled.error, tracer })
    if (compiled.error)
      return [{ text: '', filename: '0.js' }]
    return [{ text: compiled.code, filename: '0.js' }]
  },

  postprocess(messages: LintMessage[][], filename: string): LintMessage[] {
    const state = stateByFile.get(filename)
    stateByFile.delete(filename)
    const result: LintMessage[] = []

    if (state?.parseError) {
      const e = state.parseError
      result.push({
        ruleId: 'vietscript/parse-error',
        severity: 2,
        message: e.message,
        line: e.line ?? 1,
        column: e.column ?? 1,
        fatal: true,
      })
    }

    if (state) {
      for (const msgs of messages) {
        for (const msg of msgs) {
          result.push(remapMessage(msg, state.source, state.tracer))
        }
      }
    }
    return result
  },
}

export default vjsProcessor
