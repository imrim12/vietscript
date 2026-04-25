import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function load(name: string): string {
  return readFileSync(resolve(__dirname, name), 'utf-8')
}

export const tinySource = load('./tiny.vjs')
export const mediumSource = load('./medium.vjs')
export const keywordHeavySource = load('./keyword-heavy.vjs')
export const stringHeavySource = load('./string-heavy.vjs')

export const largeSource = (() => {
  const block = mediumSource
  const blocks: string[] = []
  for (let i = 0; i < 8; i++) {
    blocks.push(block.replace(/\bdiện tích\b/g, `diện tích${i}`))
  }
  return blocks.join('\n\n')
})()

export const fixtures = {
  tiny: tinySource,
  medium: mediumSource,
  keywordHeavy: keywordHeavySource,
  stringHeavy: stringHeavySource,
  large: largeSource,
} as const

export type FixtureName = keyof typeof fixtures
