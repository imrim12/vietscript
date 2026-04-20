import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

import { VietScriptError } from '@vietscript/parser'

import { compile } from '../compile.js'

export function checkCommand(filepath: string): void {
  const abs = resolve(process.cwd(), filepath)
  const source = readFileSync(abs, 'utf8')
  try {
    compile(source, abs)
    console.log(`✓ ${filepath} parse OK`)
  }
  catch (error) {
    if (error instanceof VietScriptError) {
      console.error(`✗ ${filepath}`)
      console.error(error.format())
    }
    else {
      const err = error as Error
      console.error(`✗ ${filepath}: ${err.message}`)
    }
    process.exit(1)
  }
}
