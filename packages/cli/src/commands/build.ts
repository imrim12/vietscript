import { readFileSync, writeFileSync, mkdirSync, statSync, readdirSync } from "node:fs";
import { resolve, relative, dirname, join } from "node:path";

import { compile } from "../compile.js";

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, acc);
    } else if (entry.endsWith(".vjs")) {
      acc.push(full);
    }
  }
  return acc;
}

export function buildCommand(srcDir: string, outDir: string) {
  const absSrc = resolve(process.cwd(), srcDir);
  const absOut = resolve(process.cwd(), outDir);

  const files = walk(absSrc);

  if (files.length === 0) {
    console.error(`Không tìm thấy file .vjs nào trong ${absSrc}`);
    return;
  }

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    const { code, map } = compile(source, file);

    const relPath = relative(absSrc, file).replace(/\.vjs$/, ".js");
    const outPath = join(absOut, relPath);
    mkdirSync(dirname(outPath), { recursive: true });

    const codeWithMap = `${code}\n//# sourceMappingURL=${relPath}.map\n`;
    writeFileSync(outPath, codeWithMap, "utf8");
    if (map) {
      writeFileSync(outPath + ".map", JSON.stringify(map), "utf8");
    }

    console.log(`  ${relative(process.cwd(), file)} → ${relative(process.cwd(), outPath)}`);
  }

  console.log(`\nĐã build ${files.length} file.`);
}
