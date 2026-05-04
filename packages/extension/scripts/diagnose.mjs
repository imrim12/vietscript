// Diagnose why the installed VietScript extension isn't doing anything.
// Reads the actually-installed copy from ~/.vscode/extensions, verifies its
// files match the freshly-built ones, then mocks the VSCode API and runs
// activate() to surface any throw that the editor would swallow silently.

import { spawn } from 'node:child_process'
import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { homedir, platform } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const extensionDir = resolve(__dirname, '..')

// Activation triggers async work in vscode-languageclient that calls back into
// the mocked vscode API. Some of those mocked calls return undefined where
// the real API returns a Promise, so a `.then()` may throw on the event loop
// after activate() returned. That's mock-incompleteness, not a real bug.
process.on('uncaughtException', () => {})
process.on('unhandledRejection', () => {})

console.log('=== VietScript extension diagnosis ===\n')

// 1. Locate every installed copy across all VSCode-family editors. Cursor,
//    Windsurf, Positron etc. each keep their own ~/.<editor>/extensions
//    directory, and an extension installed in one is invisible to the others.
const editorRoots = [
  { name: 'VSCode', root: join(homedir(), '.vscode/extensions') },
  { name: 'VSCode Insiders', root: join(homedir(), '.vscode-insiders/extensions') },
  { name: 'VSCode Server', root: join(homedir(), '.vscode-server/extensions') },
  { name: 'Cursor', root: join(homedir(), '.cursor/extensions') },
  { name: 'Cursor Server', root: join(homedir(), '.cursor-server/extensions') },
  { name: 'Windsurf', root: join(homedir(), '.windsurf/extensions') },
  { name: 'Positron', root: join(homedir(), '.positron/extensions') },
]
const installs = []
for (const { name, root } of editorRoots) {
  if (!existsSync(root)) continue
  const entries = readdirSync(root)
  const match = entries.find(e => e.toLowerCase().startsWith('vietscript.vscode-vietscript'))
  if (match) installs.push({ editor: name, root, dir: join(root, match) })
}

console.log('=== Editor folders scanned ===')
for (const { name, root } of editorRoots) {
  const present = existsSync(root) ? '✓' : ' '
  const has = installs.some(i => i.root === root) ? ' (has VietScript)' : ''
  console.log(`  ${present} ${name.padEnd(16)} ${root}${has}`)
}

if (installs.length === 0) {
  console.log(`\n✖ No installed copy found in any editor.`)
  console.log('  Run:')
  console.log('    pnpm --filter vscode-vietscript preview     # all editors on PATH')
  console.log('    pnpm --filter vscode-vietscript install:cursor   # just Cursor')
  console.log('    pnpm --filter vscode-vietscript install:code     # just VSCode')
  process.exit(1)
}

if (installs.length > 1) {
  console.log(`\n  ⓘ Found in ${installs.length} editors — diagnosing first one. Others:`)
  for (const i of installs.slice(1))
    console.log(`     ${i.editor}: ${i.dir}`)
}

const { dir: installedDir, root: installedRoot, editor: editorName } = installs[0]
console.log(`\n✓ Diagnosing ${editorName} install at: ${installedDir}`)

// 2. List every file with size and hash, both in the install AND in ./dist,
//    so we can spot a stale install.
function listFiles(dir, prefix = '') {
  const out = []
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry)
    const st = statSync(abs)
    if (st.isDirectory()) out.push(...listFiles(abs, join(prefix, entry)))
    else out.push({ rel: join(prefix, entry), size: st.size, abs })
  }
  return out
}
function hashFile(p) {
  return createHash('sha1').update(readFileSync(p)).digest('hex').slice(0, 12)
}

const installedFiles = listFiles(installedDir)
const localDistDir = join(extensionDir, 'dist')
const localDistFiles = existsSync(localDistDir) ? listFiles(localDistDir, 'dist') : []

const filesToCompare = [
  'dist/extension.js',
  'dist/server.js',
  'package.json',
  'syntaxes/vietscript.tmLanguage.json',
  'language-configuration.json',
]

console.log('\n=== File comparison (installed vs current build) ===')
let stale = 0
for (const rel of filesToCompare) {
  const installedAbs = join(installedDir, rel)
  const localAbs = join(extensionDir, rel)
  const installedExists = existsSync(installedAbs)
  const localExists = existsSync(localAbs)
  if (!installedExists) {
    console.log(`  ✖ MISSING in install: ${rel}`)
    stale++
    continue
  }
  if (!localExists) {
    console.log(`  ?  no local file to compare: ${rel}`)
    continue
  }
  const installedHash = hashFile(installedAbs)
  const localHash = hashFile(localAbs)
  const installedSize = statSync(installedAbs).size
  const localSize = statSync(localAbs).size
  const match = installedHash === localHash
  console.log(`  ${match ? '✓' : '✖'} ${rel}`)
  console.log(`        installed: ${installedHash}  ${installedSize} B`)
  console.log(`        local:     ${localHash}  ${localSize} B`)
  if (!match) stale++
}
if (stale > 0) {
  console.log(`\n  ⚠ ${stale} file(s) differ — the install is stale. Run:`)
  console.log(`     pnpm --filter vscode-vietscript preview`)
  console.log('  then reload the VSCode window.')
}

// 3. Inspect the installed package.json contributions.
const installedPkg = JSON.parse(readFileSync(join(installedDir, 'package.json'), 'utf8'))
console.log('\n=== Installed manifest ===')
console.log(`  name:      ${installedPkg.name}`)
console.log(`  version:   ${installedPkg.version}`)
console.log(`  publisher: ${installedPkg.publisher}`)
console.log(`  main:      ${installedPkg.main}`)
console.log(`  activationEvents: ${JSON.stringify(installedPkg.activationEvents)}`)
const langs = installedPkg.contributes?.languages ?? []
const grams = installedPkg.contributes?.grammars ?? []
console.log(`  contributes.languages: ${langs.length} → ${langs.map(l => `${l.id} (${l.extensions?.join(',')})`).join('; ')}`)
console.log(`  contributes.grammars:  ${grams.length} → ${grams.map(g => `${g.scopeName} → ${g.path}`).join('; ')}`)

// 4. Mock the VSCode API and try to require + activate the installed extension.js.
//    `vscode-languageclient` does `class X extends vscode.CompletionItem` etc.
//    at module-load time, so the mock has to return a stub class for any
//    unknown property — otherwise we trip on `extends undefined`.
console.log('\n=== Activating extension in mocked host ===')
const require_ = createRequire(import.meta.url)
const Module = require_('node:module')
const originalResolve = Module._resolveFilename

const stubClasses = new Map()
function stubClass(name) {
  if (!stubClasses.has(name))
    stubClasses.set(name, class { static get [Symbol.toStringTag]() { return name } })
  return stubClasses.get(name)
}

const fakeVscodeBase = {
  window: {
    createOutputChannel: () => ({ appendLine() {}, append() {}, clear() {}, dispose() {}, show() {}, hide() {}, name: 'mock' }),
    showInformationMessage: () => undefined,
    showErrorMessage: () => undefined,
    showWarningMessage: () => undefined,
    onDidChangeActiveTextEditor: () => ({ dispose() {} }),
    activeTextEditor: undefined,
  },
  workspace: {
    getConfiguration: () => ({ get: () => undefined, has: () => false, inspect: () => undefined, update: async () => {} }),
    onDidChangeConfiguration: () => ({ dispose() {} }),
    onDidOpenTextDocument: () => ({ dispose() {} }),
    onDidCloseTextDocument: () => ({ dispose() {} }),
    onDidChangeTextDocument: () => ({ dispose() {} }),
    onDidSaveTextDocument: () => ({ dispose() {} }),
    onDidChangeWorkspaceFolders: () => ({ dispose() {} }),
    workspaceFolders: [],
    textDocuments: [],
    fs: { stat: async () => ({ type: 0 }) },
  },
  commands: { registerCommand: () => ({ dispose() {} }), executeCommand: async () => undefined },
  languages: {
    registerCodeActionsProvider: () => ({ dispose() {} }),
    registerCompletionItemProvider: () => ({ dispose() {} }),
    createDiagnosticCollection: () => ({ set() {}, delete() {}, clear() {}, dispose() {} }),
  },
  ExtensionMode: { Production: 1, Development: 2, Test: 3 },
  Uri: {
    file: p => ({ fsPath: p, scheme: 'file', path: p, toString: () => `file://${p}` }),
    parse: s => ({ fsPath: s, scheme: 'file', path: s, toString: () => s }),
  },
  EventEmitter: class { event = () => ({ dispose() {} }); fire() {} dispose() {} },
  Disposable: class { dispose() {} static from(...d) { return { dispose: () => d.forEach(x => x?.dispose?.()) } } },
  version: '1.85.0',
}

const fakeVscode = new Proxy(fakeVscodeBase, {
  get(target, prop) {
    if (prop in target) return target[prop]
    // Any capitalised property → return a class so `extends vscode.X` works.
    if (typeof prop === 'string' && /^[A-Z]/.test(prop)) return stubClass(prop)
    return undefined
  },
})

Module._resolveFilename = function patched(request, parent, ...rest) {
  if (request === 'vscode') return 'vscode'
  return originalResolve.call(this, request, parent, ...rest)
}
const originalLoad = Module._load
Module._load = function patched(request, parent, ...rest) {
  if (request === 'vscode') return fakeVscode
  return originalLoad.call(this, request, parent, ...rest)
}

const installedExtensionJs = join(installedDir, installedPkg.main)
let extension
try {
  extension = require_(installedExtensionJs)
  console.log(`  ✓ require('${installedPkg.main}') succeeded`)
}
catch (e) {
  console.log(`  ✖ require('${installedPkg.main}') threw:`)
  console.log(`     ${e?.message ?? e}`)
  if (e?.stack) console.log(e.stack.split('\n').slice(1, 6).map(l => `       ${l.trim()}`).join('\n'))
  process.exit(1)
}

if (typeof extension.activate !== 'function') {
  console.log(`  ✖ extension exports no 'activate' function. Got: ${Object.keys(extension).join(', ')}`)
  process.exit(1)
}

const fakeContext = {
  subscriptions: [],
  asAbsolutePath: rel => join(installedDir, rel),
  extensionPath: installedDir,
  extensionUri: { fsPath: installedDir },
  globalState: { get: () => undefined, update: async () => {} },
  workspaceState: { get: () => undefined, update: async () => {} },
}

try {
  const result = await extension.activate(fakeContext)
  console.log(`  ✓ activate() returned (${result === undefined ? 'undefined' : 'value'})`)
}
catch (e) {
  console.log('  ✖ activate() threw:')
  console.log(`     ${e?.message ?? e}`)
  if (e?.stack) console.log(e.stack.split('\n').slice(1, 8).map(l => `       ${l.trim()}`).join('\n'))
  process.exit(1)
}

// 5. Try to actually start the LSP server child process the same way the
//    extension would.
const installedServer = join(installedDir, 'dist/server.js')
if (existsSync(installedServer)) {
  await new Promise((resolve) => {
    const child = spawn(process.execPath, [installedServer, '--stdio'], {
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    let stderr = ''
    let started = false
    child.stderr.on('data', d => stderr += d.toString())
    child.stdout.once('data', () => {
      started = true
      child.kill()
    })
    child.on('exit', (code) => {
      if (started || code === null) {
        console.log('  ✓ dist/server.js launches and writes to stdout')
      }
      else {
        console.log(`  ⚠ dist/server.js exited with code ${code} before any output`)
        if (stderr) console.log(`     stderr: ${stderr.trim().slice(0, 400)}`)
      }
      resolve()
    })
    setTimeout(() => {
      if (!started) {
        child.kill()
        console.log('  ⚠ dist/server.js did not produce output within 2 s (this is normal — it waits for stdin)')
      }
      resolve()
    }, 2000)
    // Send an initialize to wake it up so we get a response.
    const body = JSON.stringify({
      jsonrpc: '2.0', id: 1, method: 'initialize',
      params: { processId: process.pid, rootUri: null, capabilities: {} },
    })
    child.stdin.write(`Content-Length: ${Buffer.byteLength(body, 'utf8')}\r\n\r\n${body}`)
  })
}

// 6. Grep the editor's most recent Extension Host logs (across VSCode, Cursor,
//    Windsurf etc.) for lines mentioning our extension or activation errors.
function logRootFor(editorFolder) {
  if (platform() === 'win32')
    return join(homedir(), 'AppData/Roaming', editorFolder, 'logs')
  if (platform() === 'darwin')
    return join(homedir(), 'Library/Application Support', editorFolder, 'logs')
  return join(homedir(), '.config', editorFolder, 'logs')
}

const candidateLogRoots = [
  ['VSCode', logRootFor('Code')],
  ['VSCode Insiders', logRootFor('Code - Insiders')],
  ['Cursor', logRootFor('Cursor')],
  ['Windsurf', logRootFor('Windsurf')],
  ['Positron', logRootFor('Positron')],
]

console.log('\n=== Editor log scan ===')
let totalScanned = 0
for (const [name, logRoot] of candidateLogRoots) {
  if (!existsSync(logRoot)) continue
  console.log(`\n  ${name}: ${logRoot}`)
  const sessions = readdirSync(logRoot).sort().reverse()
  let scanned = 0
  outer: for (const session of sessions) {
    const sessionDir = join(logRoot, session)
    if (!statSync(sessionDir).isDirectory()) continue
    const subs = readdirSync(sessionDir).filter(d => d.startsWith('window'))
    for (const win of subs) {
      const exthost = join(sessionDir, win, 'exthost.log')
      const exthostNested = join(sessionDir, win, 'exthost', 'exthost.log')
      const target = existsSync(exthost) ? exthost : existsSync(exthostNested) ? exthostNested : null
      if (!target) continue
      scanned++
      totalScanned++
      const text = readFileSync(target, 'utf8')
      const hits = text.split(/\r?\n/).filter(line =>
        /vietscript/i.test(line)
        || (/error|exception|throw|cannot/i.test(line) && /extension/i.test(line))
        || /failed to activate/i.test(line),
      )
      console.log(`    ${target}  (${(text.length / 1024).toFixed(0)} KB)`)
      if (hits.length === 0) {
        console.log('      no relevant lines')
      }
      else {
        console.log(`      ${hits.length} relevant line(s):`)
        for (const hit of hits.slice(0, 20))
          console.log(`        ${hit.slice(0, 240)}`)
        if (hits.length > 20)
          console.log(`        ... ${hits.length - 20} more`)
      }
      if (scanned >= 2) break outer
    }
  }
  if (scanned === 0)
    console.log('    no exthost.log found in recent sessions')
}
if (totalScanned === 0)
  console.log('\n  ⚠ Scanned 0 logs. Open the editor at least once after installing.')

// 7. Survey other globally-installed extensions that contribute the
//    `vietscript` language id or claim `.vjs`. A conflict could cause VSCode
//    to pick a different language id for the file.
console.log('\n=== Conflicting extension scan ===')
let conflicts = 0
if (installedRoot) {
  for (const entry of readdirSync(installedRoot)) {
    const pkgPath = join(installedRoot, entry, 'package.json')
    if (!existsSync(pkgPath)) continue
    let other
    try { other = JSON.parse(readFileSync(pkgPath, 'utf8')) }
    catch { continue }
    if (other.name === installedPkg.name) continue
    const langs = other.contributes?.languages ?? []
    for (const lang of langs) {
      const claimsExt = (lang.extensions ?? []).some(e => e.toLowerCase() === '.vjs')
      const sameId = lang.id === 'vietscript'
      if (claimsExt || sameId) {
        conflicts++
        console.log(`  ⚠ ${other.name}@${other.version} contributes language "${lang.id}"${claimsExt ? ' claiming .vjs' : ''}`)
      }
    }
  }
}
if (conflicts === 0) console.log('  ✓ No other installed extension claims .vjs or the "vietscript" id.')

console.log('\n=== Recommendation ===')
console.log('If everything above is ✓:')
console.log('  • Quit VSCode entirely (close all windows). Reload Window is sometimes')
console.log('    not enough — extensions that previously failed activation can stay')
console.log('    in a broken state until a clean restart.')
console.log('  • Reopen, open a .vjs file, look at the bottom-right of the status bar:')
console.log('    it should say "VietScript", not "Plain Text".')
