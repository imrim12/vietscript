# VietScript

**Ngôn ngữ lập trình tiếng Việt** — transpile ra JavaScript, chạy trên browser, Node, Bun.

```vietscript
hằng số tên = "Thế giới"
console.log(`Xin chào, ${tên}!`)

hàm cộng(a, b = 0) {
  trả về a + b
}

hằng số mảng = [1, 2, 3, 4, 5]
hằng số tổng = mảng.reduce((acc, x) => acc + x, 0)
console.log("Tổng:", tổng)
```

## Bắt đầu

```bash
pnpm install
pnpm -r build
node packages/cli/bin/vietscript.mjs run examples/hello/hello.vjs
```

### CLI

```bash
vietscript run <file.vjs>              # Chạy file .vjs
vietscript build <srcDir> [outDir]     # Build thư mục .vjs → JS
vietscript watch <srcDir> [outDir]     # Watch + auto-rebuild
vietscript check <file.vjs>            # Kiểm tra cú pháp không chạy
```

## Cú pháp

VietScript giữ ngữ nghĩa JavaScript 100% — chỉ thay keyword tiếng Anh bằng tiếng Việt. Code giống JS mà bạn đã quen.

| JS | VietScript |
|---|---|
| `var/let/const` | `khai báo` / `biến` / `hằng số` |
| `function` | `hàm` |
| `if/else` | `nếu` / `không thì` |
| `for (of/in)` | `lặp (của/trong)` |
| `while` | `khi mà` |
| `class/extends/this` | `lớp` / `kế thừa` / `đây` |
| `try/catch/throw` | `thử` / `bắt lỗi` / `báo lỗi` |
| `return` | `trả về` |
| `async/await` | `bất đồng bộ` / `chờ` |
| `import/export/from` | `sử dụng` / `cho phép` / `từ` |
| `true/false/null/undefined` | `đúng` / `sai` / `rỗng` / `không xác định` |
| `typeof/instanceof` | `kiểu của` / `là kiểu` |
| `get/set/static` | `lấy` / `gán` / `tĩnh` |
| `public/private/protected` | `công khai` / `riêng tư` / `bảo vệ` |

Đầy đủ danh sách tại [docs/compatibility.md](docs/compatibility.md).

## Feature đã hỗ trợ

| | |
|---|---|
| ✅ | Mọi declaration (var/let/const) + destructuring object/array |
| ✅ | Mọi loại function (arrow, async, generator, async generator, default params, rest) |
| ✅ | Class đầy đủ (kế thừa, private field `#x`, getter/setter, static, method) |
| ✅ | Control flow đầy đủ (if, switch, for/of/in, while, do-while, labeled break/continue) |
| ✅ | try/catch/finally/throw |
| ✅ | ES6 modules (import/export/default/namespace/as) |
| ✅ | Template literal với interpolation `` `${x}` `` |
| ✅ | Spread/Rest `...` (array, object, call, params) |
| ✅ | Optional chaining `?.`, nullish `??`, logical assignment `\|\|=` etc. |
| ✅ | Regex literal `/abc/gi`, template, hex/oct/bin/BigInt/numeric separator |
| ✅ | Comment `//` và `/* */` |
| ✅ | Escape sequence đầy đủ (`\n`, `\x41`, `\u{1F600}`, v.v.) |
| ✅ | Error messages tiếng Việt có file:line:col + snippet |
| ✅ | Source maps (debug stack trace trỏ về file `.vjs`) |

**Kiểm tra chi tiết:** [docs/compatibility.md](docs/compatibility.md) — 70.9% ✅ complete, 24.6% 🟡 partial, 4.5% ❌ missing.

**Lộ trình:** [docs/roadmap.md](docs/roadmap.md).

## Dự án cấu trúc

```
packages/
├── parser/        Parser + AST + Babel-compatible
├── shared/        Types + enum chung
├── cli/           CLI `vietscript`
└── plugins/
    ├── vite/      Vite plugin
    └── webpack/   Webpack loader
```

## Phát triển

```bash
pnpm install
pnpm test                 # 249 test
pnpm test:coverage        # coverage report (≥88% statements)
pnpm lint
pnpm build                # build tất cả package
```

Hướng dẫn thêm parser node mới: [CONTRIBUTING.md](CONTRIBUTING.md).

## Playground

Demo live: [sandbox.vietscript.org](https://sandbox.vietscript.org)

## License

[MIT](https://opensource.org/licenses/MIT) — Copyright (c) 2022-present, Nguyen Huu Nguyen Y
