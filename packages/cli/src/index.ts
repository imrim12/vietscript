import { VietScriptError } from "@vietscript/parser";

import { runCommand } from "./commands/run.js";
import { buildCommand } from "./commands/build.js";
import { watchCommand } from "./commands/watch.js";
import { checkCommand } from "./commands/check.js";

const USAGE = `VietScript CLI

Cách dùng:
  vietscript run <file.vjs>              Chạy file .vjs
  vietscript build <srcDir> [outDir]     Build thư mục .vjs → JS (mặc định outDir: dist)
  vietscript watch <srcDir> [outDir]     Build + watch thay đổi
  vietscript check <file.vjs>            Parse không chạy, chỉ kiểm tra cú pháp
  vietscript --help                      Hiển thị hướng dẫn
`;

function printError(error: unknown): void {
  if (error instanceof VietScriptError) {
    console.error(error.format());
    return;
  }
  const err = error as Error;
  console.error(`Lỗi: ${err.message}`);
}

export async function main(argv: string[]) {
  const args = argv.slice(2);
  const command = args[0];

  if (!command || command === "--help" || command === "-h") {
    console.log(USAGE);
    return;
  }

  try {
    switch (command) {
      case "run": {
        if (!args[1]) {
          console.error("Thiếu tham số file. Cách dùng: vietscript run <file.vjs>");
          process.exit(1);
        }
        await runCommand(args[1]);
        break;
      }
      case "build": {
        if (!args[1]) {
          console.error("Thiếu tham số thư mục. Cách dùng: vietscript build <srcDir> [outDir]");
          process.exit(1);
        }
        buildCommand(args[1], args[2] ?? "dist");
        break;
      }
      case "watch": {
        if (!args[1]) {
          console.error("Thiếu tham số thư mục. Cách dùng: vietscript watch <srcDir> [outDir]");
          process.exit(1);
        }
        watchCommand(args[1], args[2] ?? "dist");
        break;
      }
      case "check": {
        if (!args[1]) {
          console.error("Thiếu tham số file. Cách dùng: vietscript check <file.vjs>");
          process.exit(1);
        }
        checkCommand(args[1]);
        break;
      }
      default: {
        console.error(`Command không hợp lệ: "${command}"\n`);
        console.log(USAGE);
        process.exit(1);
      }
    }
  } catch (error) {
    printError(error);
    process.exit(1);
  }
}
