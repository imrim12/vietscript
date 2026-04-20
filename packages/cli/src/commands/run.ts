import { readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'

import { compile } from '../compile.js'

export async function runCommand(filepath: string): Promise<void> {
  const abs = resolve(process.cwd(), filepath)
  const source = readFileSync(abs, 'utf8')
  const { code, map } = compile(source, abs)

  const dir = dirname(abs)
  const name = basename(abs, '.vjs')
  const outFile = resolve(dir, `.${name}.vjs.tmp.mjs`)
  const mapFile = `${outFile}.map`

  const codeWithMap = `${code}\n//# sourceMappingURL=${basename(mapFile)}\n`
  writeFileSync(outFile, codeWithMap, 'utf8')
  if (map)
    writeFileSync(mapFile, JSON.stringify(map), 'utf8')

  try {
    await import(pathToFileURL(outFile).href)
  }
  finally {
    try {
      unlinkSync(outFile)
      if (map)
        unlinkSync(mapFile)
    }
    catch {}
  }
}
