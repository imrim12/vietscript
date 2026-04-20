import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { compile } from "../compile.js";

export async function runCommand(filepath: string) {
  const abs = resolve(process.cwd(), filepath);
  const source = readFileSync(abs, "utf8");
  const { code, map } = compile(source, abs);

  const tmpDir = mkdtempSync(join(tmpdir(), "vietscript-"));
  const outFile = join(tmpDir, "main.mjs");
  const mapFile = outFile + ".map";

  const codeWithMap = `${code}\n//# sourceMappingURL=${mapFile}\n`;
  writeFileSync(outFile, codeWithMap, "utf8");
  if (map) {
    writeFileSync(mapFile, JSON.stringify(map), "utf8");
  }

  await import(pathToFileURL(outFile).href);
}
