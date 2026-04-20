# Changelog

## [Unreleased]

### Added — Phase 0 (nền tảng)
- Vitest 1.6 + v8 coverage reporting, baseline ≥88% statements
- GitHub Actions CI: lint + test matrix (Node 18/20/22 × Ubuntu/Windows) + build + compat summary
- 14 Vietnamese keyword aliases: `biến`, `nhường`, `đây`, `rỗng`, `tĩnh`, `công khai`, `riêng tư`, `bảo vệ`, `lấy`, `gán`, `vô cực`, `của`, `lặp`, `là kiểu`
- `CONTRIBUTING.md` với template thêm parser node + Unicode boundary rules
- `scripts/compat-summary.mjs` — dashboard đọc `compatibility.md` + `coverage-summary.json`
- `docs/compatibility.md` + `docs/roadmap.md`

### Added — Phase 1 (cú pháp P1)
- Arrow function (single param, paren, multi, empty; expr + block body)
- Default parameters (`AssignmentPattern`)
- Rest parameters (`RestElement`) + validation vị trí
- Spread (`...`) trong array / object / call
- Destructuring object: shorthand, rename, default, rest, nested
- Destructuring array: hole, default, rest, nested, mixed
- Template literal interpolation `${...}` với nested braces
- `for...of` / `for...in` / `for await ... of`
- Object shorthand `{a}` + computed key `{[k]: v}`

### Added — Phase 2 (cú pháp P2)
- Private field `#x` (`ClassPrivateProperty`)
- Getter/setter trong class + object literal (`lấy` / `gán`)
- Yield expression + `yield*` (tiếng Việt: `nhường`)
- Optional chaining edge cases: `?.prop`, `?.[k]`, chained
- Compound assignment đầy đủ (16 operators): `+=`, `-=`, `*=`, `/=`, `%=`, `**=`, `&=`, `|=`, `^=`, `<<=`, `>>=`, `>>>=`, `||=`, `&&=`, `??=`
- Numeric literals nâng cao: hex `0x`, octal `0o`, binary `0b`, BigInt `123n`, separator `1_000`
- Regex literal `/x/gi` với context-aware tokenization
- String escape sequences: `\n`, `\t`, `\x41`, `\u{1F600}`, v.v.
- Labeled break/continue + fix bug `ContinueStatement` ăn nhầm `BREAK` keyword
- Ternary `c ? a : b` (`ConditionalExpression`)
- `NewExpression` với args + `SpreadElement`
- `TaggedTemplateExpression`
- `SuperExpression` (call + member)
- `InfinityIdentifier`
- Dynamic import `sử dụng("path")`
- Optional catch binding `bắt lỗi {}`
- Access modifiers trong class (`công khai`/`riêng tư`/`bảo vệ`)
- Static method/property with `tĩnh` keyword
- Generator method `*foo()`
- Method detection trong class body (transition ClassProperty → ClassMethod khi thấy `(`)

### Added — Phase 3 (mangling)
- Identifier mangling mới: `xin chào` → `xin_chào` (Unicode trực tiếp, thay vì codepoint `_xin_ch224o`)

### Added — Phase 4 (error quality)
- `VietScriptError` class với `file:line:col` + snippet + caret + hint
- `Parser.filename` support

### Added — Phase 5 (CLI + runtime)
- `@vietscript/cli` package với commands: `run`, `build`, `watch`, `check`
- Source maps qua `@babel/generator`
- Node ESM loader: `node --import '@vietscript/cli/register' file.vjs`
- Bun plugin: `@vietscript/cli/bun-plugin`
- Binary: `vietscript` / `vjs`

### Added — Phase 6 (plugins)
- Fix Vite plugin: emit JS (trước đây trả về JSON AST)
- Fix Webpack plugin: same fix + source maps via `this.callback`

### Added — Phase 7 (stdlib)
- `@vietscript/stdlib` — wrappers tiếng Việt cho JS globals
  - Console: `ghi`, `ghi lỗi`, `ghi cảnh báo`
  - Ép kiểu: `tự số`, `tự chuỗi`, `tự bool`, `kiểu`, `độ dài`
  - Math: `tròn`, `làm tròn xuống`, `làm tròn lên`, `giá trị tuyệt đối`, `nhỏ nhất`, `lớn nhất`, `ngẫu nhiên`
  - Async: `đợi`
  - JSON: `phân tích JSON`, `JSON sang chuỗi`
  - Fetch: `tải văn bản`, `tải JSON`

### Fixed
- Tokenizer: specs order bị sai (prefix conflict `+` vs `+=`) → reorder longest-first
- Tokenizer: trailing non-ASCII char boundary (`xoá`, `chờ`, `khi mà`, `riêng tư`, `bảo vệ`) dùng negative lookahead thay vì `\b`
- Tokenizer: multi-word identifier nuốt embedded keyword (e.g. `x của arr` thành 1 identifier)
- `UnaryExpression`: dùng Keyword enum thay vì string literals
- `BinaryExpression`: support `instanceof`, `in` keyword operators + bitwise ops
- `ContinueStatement`: eat `CONTINUE` keyword thay vì `BREAK`
- `ExpressionStatement`: unwrap `LabeledStatement` khi Expression trả về statement-like
- `StatementList`: handle leading `;` as `EmptyStatement` (không infinite loop)
- `UndefinedIdentifier`: name = `"undefined"` lowercase (trước là `"Undefined"`)
- `ClassDeclaration`: support `extends` keyword (ngoài dạng paren)
- Docs: xóa JSON-based dummy output từ Vite/Webpack plugin

### Stats
- Tests: 70 → 298 (100% pass)
- Coverage: 79.85% → 92.44% statements / 71.23% → 85.88% branches / 84.89% → 96.25% functions
- Compatibility matrix: 40.8% → 98.5% complete (135/137 features)

## [0.0.1] - Initial

Initial parser skeleton, basic syntax support, playground.
