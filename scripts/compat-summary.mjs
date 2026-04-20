#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const matrixPath = resolve(repoRoot, 'docs/compatibility.md')
const coveragePath = resolve(repoRoot, 'coverage/coverage-summary.json')

function parseMatrix(md) {
  const sections = []
  const lines = md.split(/\r?\n/)
  let currentSection = null

  for (const line of lines) {
    const sectionMatch = line.match(/^##\s+\d+\.\s+(.+?)\s*$/)
    if (sectionMatch) {
      currentSection = { name: sectionMatch[1], done: 0, partial: 0, missing: 0, total: 0 }
      sections.push(currentSection)
      continue
    }
    if (!currentSection)
      continue
    if (!line.startsWith('|'))
      continue
    if (line.includes('---'))
      continue
    if (/^\|\s*Feature/i.test(line) || /^\|\s*JS/i.test(line))
      continue

    const cells = line.split('|').map(c => c.trim())
    const cellJoined = cells.join(' ')
    if (!/✅|🟡|❌/.test(cellJoined))
      continue

    const doneCount = (cellJoined.match(/✅/g) || []).length
    const partialCount = (cellJoined.match(/🟡/g) || []).length
    const missingCount = (cellJoined.match(/❌/g) || []).length

    if (doneCount > 0 && partialCount === 0 && missingCount === 0) {
      currentSection.done++
    }
    else if (missingCount > 0 && doneCount === 0 && partialCount === 0) {
      currentSection.missing++
    }
    else {
      currentSection.partial++
    }
    currentSection.total++
  }

  return sections
}

function formatPct(part, total) {
  if (total === 0)
    return '—'
  return `${((part / total) * 100).toFixed(1)}%`
}

function main() {
  if (!existsSync(matrixPath)) {
    console.error(`Không tìm thấy ${matrixPath}`)
    process.exit(1)
  }

  const md = readFileSync(matrixPath, 'utf8')
  const sections = parseMatrix(md)

  const totals = sections.reduce(
    (acc, s) => ({
      done: acc.done + s.done,
      partial: acc.partial + s.partial,
      missing: acc.missing + s.missing,
      total: acc.total + s.total,
    }),
    { done: 0, partial: 0, missing: 0, total: 0 },
  )

  let out = ''
  out += '## VietScript — Compatibility summary\n\n'
  out += `**Tổng feature tracked:** ${totals.total}\n\n`
  out += `- ✅ Hoàn thiện: **${totals.done}** (${formatPct(totals.done, totals.total)})\n`
  out += `- 🟡 Một phần: **${totals.partial}** (${formatPct(totals.partial, totals.total)})\n`
  out += `- ❌ Chưa có: **${totals.missing}** (${formatPct(totals.missing, totals.total)})\n\n`

  out += '### Theo từng nhóm\n\n'
  out += '| Nhóm | ✅ | 🟡 | ❌ | Tổng | % hoàn thiện |\n'
  out += '|---|---:|---:|---:|---:|---:|\n'
  for (const s of sections) {
    out += `| ${s.name} | ${s.done} | ${s.partial} | ${s.missing} | ${s.total} | ${formatPct(s.done, s.total)} |\n`
  }

  if (existsSync(coveragePath)) {
    const cov = JSON.parse(readFileSync(coveragePath, 'utf8'))
    const t = cov.total
    out += '\n### Test coverage\n\n'
    out += '| Metric | % | Covered / Total |\n'
    out += '|---|---:|---:|\n'
    out += `| Statements | ${t.statements.pct}% | ${t.statements.covered}/${t.statements.total} |\n`
    out += `| Branches | ${t.branches.pct}% | ${t.branches.covered}/${t.branches.total} |\n`
    out += `| Functions | ${t.functions.pct}% | ${t.functions.covered}/${t.functions.total} |\n`
    out += `| Lines | ${t.lines.pct}% | ${t.lines.covered}/${t.lines.total} |\n`
  }
  else {
    out += '\n_Coverage chưa được generate. Chạy `pnpm test:coverage` trước._\n'
  }

  process.stdout.write(out)
}

main()
