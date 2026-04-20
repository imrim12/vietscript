import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import process from 'node:process'

import chokidar from 'chokidar'

import { compile } from '../compile.js'

export function watchCommand(srcDir: string, outDir: string): void {
  const absSrc = resolve(process.cwd(), srcDir)
  const absOut = resolve(process.cwd(), outDir)

  function buildFile(file: string): void {
    try {
      const source = readFileSync(file, 'utf8')
      const { code, map } = compile(source, file)
      const relPath = relative(absSrc, file).replace(/\.vjs$/, '.js')
      const outPath = join(absOut, relPath)
      mkdirSync(dirname(outPath), { recursive: true })
      const codeWithMap = `${code}\n//# sourceMappingURL=${relPath}.map\n`
      writeFileSync(outPath, codeWithMap, 'utf8')
      if (map)
        writeFileSync(`${outPath}.map`, JSON.stringify(map), 'utf8')
      console.log(`  ✓ ${relative(process.cwd(), file)}`)
    }
    catch (error) {
      const err = error as Error
      console.error(`  ✗ ${relative(process.cwd(), file)}: ${err.message}`)
    }
  }

  const watcher = chokidar.watch(`${absSrc}/**/*.vjs`, { persistent: true })
  watcher.on('add', buildFile)
  watcher.on('change', buildFile)

  console.log(`Watching ${absSrc}...`)
}
