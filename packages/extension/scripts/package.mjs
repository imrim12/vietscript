// vsce can't read pnpm's `catalog:` protocol — it parses package.json directly
// as JSON and chokes on non-semver values. This wrapper substitutes catalog
// refs with resolved versions, runs vsce, then restores the original.

import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const extensionDir = resolve(__dirname, '..')
const repoRoot = resolve(extensionDir, '../..')
const pkgPath = resolve(extensionDir, 'package.json')
const workspacePath = resolve(repoRoot, 'pnpm-workspace.yaml')

const original = readFileSync(pkgPath, 'utf8')
const pkg = JSON.parse(original)

const workspaceYaml = readFileSync(workspacePath, 'utf8')
const catalog = parseCatalog(workspaceYaml)

const resolved = structuredClone(pkg)
resolveCatalog(resolved.dependencies, catalog)
resolveCatalog(resolved.devDependencies, catalog)
resolveCatalog(resolved.peerDependencies, catalog)

writeFileSync(pkgPath, `${JSON.stringify(resolved, null, 2)}\n`, 'utf8')

let exitCode = 1
try {
  const result = spawnSync(
    'pnpm',
    ['dlx', '@vscode/vsce', 'package', '--no-dependencies', '--out', 'vietscript.vsix', ...process.argv.slice(2)],
    { cwd: extensionDir, stdio: 'inherit', shell: true },
  )
  exitCode = result.status ?? 1
}
finally {
  writeFileSync(pkgPath, original, 'utf8')
}
process.exit(exitCode)

function parseCatalog(yaml) {
  const out = {}
  const lines = yaml.split(/\r?\n/)
  let inCatalog = false
  for (const line of lines) {
    if (/^catalog\s*:\s*$/.test(line)) {
      inCatalog = true
      continue
    }
    if (inCatalog) {
      if (/^[A-Z]/i.test(line))
        break
      const m = line.match(/^\s+['"]?([^'":]+)['"]?\s*:\s*['"]?([^'"]+?)['"]?\s*$/)
      if (m)
        out[m[1].trim()] = m[2].trim()
    }
  }
  return out
}

function resolveCatalog(deps, catalog) {
  if (!deps)
    return
  for (const key of Object.keys(deps)) {
    if (deps[key] === 'catalog:') {
      const resolvedVersion = catalog[key]
      if (!resolvedVersion) {
        throw new Error(`Catalog entry not found for ${key}; check pnpm-workspace.yaml`)
      }
      deps[key] = resolvedVersion
    }
  }
}
