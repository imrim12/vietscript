import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { compile } from "./compile.js";

export async function load(
  url: string,
  context: { format?: string | null; importAssertions?: Record<string, unknown> },
  nextLoad: (url: string, context: unknown) => Promise<{ source?: string | null; format?: string | null }>,
): Promise<{ format: string; source: string; shortCircuit?: boolean }> {
  if (url.endsWith(".vjs")) {
    const filepath = fileURLToPath(url);
    const source = readFileSync(filepath, "utf8");
    const { code } = compile(source, filepath);
    return {
      format: "module",
      source: code,
      shortCircuit: true,
    };
  }
  return nextLoad(url, context) as Promise<{ format: string; source: string }>;
}

export async function resolve(
  specifier: string,
  context: { parentURL?: string },
  nextResolve: (specifier: string, context: unknown) => Promise<{ url: string; format?: string | null }>,
): Promise<{ url: string; format?: string | null; shortCircuit?: boolean }> {
  const resolved = await nextResolve(specifier, context);
  return resolved;
}
