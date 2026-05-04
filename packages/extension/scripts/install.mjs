// Install the freshly-packaged .vsix into whichever VSCode-family editors
// are present on the machine. Pass `code`, `cursor`, `windsurf`, etc. as
// args to limit to specific targets, or run with no args to install into all
// of them. Returns non-zero only if no editor accepted the install.

import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const extensionDir = resolve(__dirname, '..')
const vsix = resolve(extensionDir, 'vietscript.vsix')

if (!existsSync(vsix)) {
  console.error(`✖ vietscript.vsix not found — run 'pnpm package' first.`)
  process.exit(1)
}

// Forks of VSCode that all accept the same .vsix.
const KNOWN = ['code', 'code-insiders', 'cursor', 'windsurf', 'positron']

const requested = process.argv.slice(2)
const targets = requested.length > 0 ? requested : KNOWN

let installed = 0
let attempted = 0

for (const cli of targets) {
  attempted++
  const probe = spawnSync(cli, ['--version'], { shell: true, stdio: 'ignore' })
  if (probe.status !== 0) {
    if (requested.length > 0)
      console.log(`✖ ${cli}: not on PATH`)
    continue
  }
  console.log(`→ ${cli} --install-extension ${vsix} --force`)
  const result = spawnSync(cli, ['--install-extension', vsix, '--force'], {
    shell: true,
    stdio: 'inherit',
  })
  if (result.status === 0) {
    installed++
    console.log(`✓ ${cli}`)
  }
  else {
    console.log(`✖ ${cli} exited with code ${result.status}`)
  }
}

if (installed === 0) {
  console.error(`\n✖ No editor accepted the install (tried ${attempted}).`)
  console.error('  Make sure at least one of these CLIs is on PATH: code, cursor, windsurf')
  process.exit(1)
}

console.log(`\n✓ Installed into ${installed} editor(s). Open a fresh window (or reload) to pick up the extension.`)
