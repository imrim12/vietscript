#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const files = execSync('git ls-files "packages/parser/src/**/*.test.ts" "packages/parser/src/**/*.snap"')
  .toString()
  .trim()
  .split("\n");

function decodeMangled(name) {
  return name.replace(/(\d+)/g, (_, digits) => {
    let out = "";
    let i = 0;
    while (i < digits.length) {
      const ch = digits[i];
      let consumed = 0;
      let code = 0;
      if (ch === "7") {
        const four = Number(digits.slice(i, i + 4));
        if (four >= 7840 && four <= 7929) {
          code = four;
          consumed = 4;
        }
      }
      if (!consumed) {
        const three = Number(digits.slice(i, i + 3));
        if (three >= 224 && three <= 511) {
          code = three;
          consumed = 3;
        }
      }
      if (consumed) {
        out += String.fromCodePoint(code);
        i += consumed;
      } else {
        out += digits[i];
        i++;
      }
    }
    return out;
  });
}

let changedCount = 0;
for (const file of files) {
  if (!file) continue;
  const content = readFileSync(file, "utf8");
  let changed = content;

  changed = changed.replace(/_[a-zA-Z\u00C0-\u1EF90-9][a-zA-Z\u00C0-\u1EF9_0-9]*/g, (match) => {
    const inner = match.slice(1);
    if (!/\d/.test(inner)) return match;
    const decoded = decodeMangled(inner);
    return decoded;
  });

  if (changed !== content) {
    writeFileSync(file, changed);
    changedCount++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`\nTotal files changed: ${changedCount}`);
