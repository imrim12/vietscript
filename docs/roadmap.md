# Roadmap hoàn thiện VietScript

Kế hoạch đầy đủ đưa dự án từ trạng thái hiện tại (parser ~70%, không có CLI, chưa chạy được trong project thật) đến **v1.0 ổn định**, dùng được trên browser / Node / Bun.

Tham chiếu trạng thái: [compatibility.md](./compatibility.md).

---

## 0. Nguyên tắc & quyết định cố định

Những quyết định này đã chốt trước khi bắt đầu để không phải quay lại bàn trong quá trình thực thi.

### Target & scope

- **Target runtime:** JavaScript (browser + Node + Bun). Không tự viết runtime.
- **Codegen:** dùng `@babel/generator` đã có sẵn. Không thay thế.
- **AST:** giữ chuẩn Babel-compatible.
- **Không làm trong scope v1.0:** type system, LSP, formatter, REPL tương tác, tối ưu bytecode. Để dành post-v1.
- **File extension:** `.vjs` (đã dùng). Không đổi.

### Keyword tiếng Việt — quyết định

Tất cả keyword JS phải có bản tiếng Việt. Lần này mình chốt:

| JS | Tiếng Việt mới | Giữ alias tiếng Anh? |
|---|---|---|
| `let` | `biến` | Có (backward compat) |
| `yield` | `nhường` | Có |
| `this` | `đây` | Có |
| `null` | `rỗng` | Có |
| `instanceof` | `là kiểu` | Có |
| `static` | `tĩnh` | Có |
| `public` | `công khai` | Có |
| `private` | `riêng tư` | Có |
| `protected` | `bảo vệ` | Có |
| `get` | `lấy` | Có |
| `set` | `gán` | Có |
| `of` (for...of) | `của` | — |
| `in` (for...in) | `trong` | — |
| `Infinity` | `vô cực` | Có |
| `async` generator `*` | giữ `*` symbol | — |

Alias tiếng Anh giữ lại vì một số chưa có bản tiếng Việt sạch, và để tránh phá code đã có. Khuyến khích dùng tiếng Việt trong docs/example.

### Identifier mangling — quyết định

Hiện tại: `xin chào` → `_xin_ch224o` (codepoint encoding, xấu, khó debug).

**Đổi sang:** giữ nguyên Unicode (JS hỗ trợ Unicode identifier từ ES2015), chỉ thay space bằng `_`:

```
xin chào        →  xin_chào
Con Mèo         →  Con_Mèo
số chân         →  số_chân
```

- Ưu: output đọc được, dễ debug, 1-1 mapping.
- Nhược: nếu user có sẵn `xin_chào` (có underscore) và `xin chào` (có space) thì collision. Xử lý: detect collision tại parse time → throw error rõ ràng. Chấp nhận constraint này, không cố tự resolve.
- Fallback cho ký tự thật sự không hợp lệ JS (rất hiếm với tiếng Việt): encode `\u{xxxx}`.

### Test policy

Mọi feature mới đều phải có 3 nhóm test **trước khi merge**:
1. **Parser positive** — parse đúng, AST đúng shape.
2. **Parser negative** — cú pháp sai → throw lỗi tiếng Việt với file:line.
3. **Codegen** — AST → JS string chuẩn, dùng snapshot.

Coverage target: **≥85% statements** trên `packages/parser/src` khi đóng v1.0.

### Scope boundary cứng

Không làm trong v1.0, **dù tiện tay cỡ nào**:
- TypeScript type annotations
- JSX
- Decorators
- Pattern matching (proposal)
- Pipeline operator

Các thứ này đáng làm nhưng sẽ phình scope. Ghi vào post-v1 backlog.

---

## 1. Cấu trúc roadmap

9 giai đoạn, thứ tự tuyến tính (mỗi phase phụ thuộc phase trước):

| Phase | Nội dung | Ước lượng effort |
|---|---|---|
| 0 | Thiết lập nền & keyword migration | 3-4 ngày |
| 1 | Cú pháp P1 (arrow, destructuring, spread, template, for-of/in, default param) | 2-3 tuần |
| 2 | Cú pháp P2 (private, getter/setter, regex, logical assign, ...) | 2 tuần |
| 3 | Identifier mangling mới + collision detection | 3-5 ngày |
| 4 | Source map + error messages chất lượng | 1 tuần |
| 5 | CLI (`vietscript run/build/watch`) + Node loader | 1-2 tuần |
| 6 | Plugin Vite/Webpack chạy thật + Bun support | 1 tuần |
| 7 | Stdlib mỏng (wrappers tiếng Việt cho JS globals) | 3-5 ngày |
| 8 | Docs tái cấu trúc + 1 sample app chạy thật | 1 tuần |
| 9 | Release v1.0 (npm publish + announcement) | 2-3 ngày |

**Tổng:** ~10-14 tuần làm part-time (hobby). Chạy tuyến tính, không parallel — vì một mình làm.

---

## 2. Phase 0 — Thiết lập nền (3-4 ngày)

Mục tiêu: có đủ tooling và quyết định để mọi phase sau chạy mượt.

### 0.1 Coverage reporter
- Thêm `@vitest/coverage-v8` vào devDeps.
- Cập nhật [vitest.config.ts](../vitest.config.ts) bật `coverage: { reporter: ['text','html','json-summary'], include: ['packages/*/src/**'], exclude: ['**/__test__/**'] }`.
- Script: `pnpm test:coverage`.
- Ghi baseline coverage vào [compatibility.md](./compatibility.md).

### 0.2 CI (GitHub Actions)
- Tạo `.github/workflows/ci.yml`.
- Chạy: `pnpm install`, `pnpm lint`, `pnpm test:coverage`, `pnpm build`.
- Upload coverage report.
- Enforce: PR phải pass trước khi merge.

### 0.3 Thêm keyword tiếng Việt (non-breaking)
- Thêm các keyword mới ở [keyword.enum.ts](../packages/shared/parser/keyword.enum.ts).
- Thêm mapping ở [specs.ts](../packages/parser/src/constants/specs.ts).
- Tokenizer phải accept **cả** tên mới và alias tiếng Anh (không break code cũ).
- Test: mỗi keyword mới có 1 test parse minimal.

### 0.4 Convention code mới
- Ghi `CONTRIBUTING.md` phần "thêm parser node": pattern chuẩn để implement `Parse()` + `Node` class + test 3 nhóm.
- Template file để copy khi thêm node mới.

### 0.5 Build compatibility matrix dashboard
- Tự động sinh % hoàn thiện từ [compatibility.md](./compatibility.md) (parse markdown table, đếm ✅/🟡/❌).
- Hiển thị trong CI summary.

**Acceptance:**
- [x] `pnpm test:coverage` chạy được, ra số.
- [x] CI xanh trên PR mẫu.
- [x] 11 keyword mới có trong enum + tokenize được.
- [x] `CONTRIBUTING.md` có hướng dẫn thêm node.

---

## 3. Phase 1 — Cú pháp P1 (2-3 tuần)

Mục tiêu: xóa bỏ cảm giác "ngôn ngữ thiếu". Mỗi feature = 1 PR.

Thứ tự đề xuất (ít phụ thuộc → nhiều phụ thuộc):

### 1.1 Arrow function
- File mới: `nodes/expressions/ArrowFunctionExpression.ts`.
- Parse: `(params) => expr`, `(params) => { ... }`, `x => x`, `async () => ...`.
- AST shape: Babel `ArrowFunctionExpression` với `params`, `body`, `async`, `expression` flag.
- Tính: precedence đặt thấp để không va đụng ternary.

### 1.2 Default parameters
- Mở rộng `ParameterList`: sau identifier, nếu gặp `=` → wrap `AssignmentPattern`.
- Áp dụng cho function, method, arrow, constructor.

### 1.3 Rest parameters
- Trong `ParameterList`: nếu bắt đầu bằng `...` → `RestElement`.
- Chỉ cho phép ở vị trí cuối.
- Error tiếng Việt nếu sai vị trí.

### 1.4 Spread operator
- Trong call args: `f(...a)` → `SpreadElement`.
- Trong array: `[...a]` → `SpreadElement`.
- Trong object: `{...o}` → `SpreadElement` (Babel shape khác object vs array).

### 1.5 Destructuring — object
- File mới: `nodes/patterns/ObjectPattern.ts`.
- Parse trong: variable declarator, function param, assignment target.
- Hỗ trợ: shorthand `{a}`, rename `{a: b}`, default `{a = 1}`, rest `{a, ...b}`, nested `{a: {b}}`.

### 1.6 Destructuring — array
- File mới: `nodes/patterns/ArrayPattern.ts`.
- Hỗ trợ: `[a, b]`, hole `[, b]`, default `[a = 1]`, rest `[a, ...b]`, nested `[a, [b]]`.

### 1.7 Template literal interpolation
- Sửa tokenizer: backtick string tách thành `TemplateLiteral` với `quasis` + `expressions`.
- Parse recursive: `${...}` chứa expression (có thể chứa template literal khác).
- Escape: `\``, `\${`.

### 1.8 `for...of` / `for...in`
- Sửa [ForStatement.ts](../packages/parser/src/nodes/statements/breakable/iteration/ForStatement.ts): sau `(decl`, nếu gặp keyword `của` → `ForOfStatement`, `trong` → `ForInStatement`.
- Xóa throw "not implemented".
- Hỗ trợ `for await (... của ...)`.

### 1.9 Object shorthand + computed key
- Shorthand: `{a}` parse thành `Property { key: a, value: a, shorthand: true }`.
- Computed: `{[expr]: value}` → `Property { computed: true, key: expr }`.

**Acceptance mỗi feature:**
- Parser positive test (≥3 case bao gồm edge).
- Parser negative test (cú pháp sai → error tiếng Việt).
- Codegen snapshot test.
- Cập nhật [compatibility.md](./compatibility.md) từ ❌ → ✅.

**Acceptance Phase 1:**
- Coverage tăng ít nhất +10% so với baseline.
- Demo: viết lại `sandbox/src/index.vjs` dùng arrow + destructuring + template → parse + codegen ra JS chạy được với `node --input-type=module -e "..."`.

---

## 4. Phase 2 — Cú pháp P2 (2 tuần)

Hoàn thiện phần dang dở.

### 2.1 Private field `#x`
- Tokenizer: `#identifier` thành token riêng.
- Parse trong class body: property + method.
- Chỉ cho truy cập trong class.

### 2.2 Getter/setter
- Object literal: `{get x() {}, set x(v) {}}` → `Property { kind: 'get'|'set' }`.
- Class body: `lấy x() {}`, `gán x(v) {}` (dùng keyword tiếng Việt đã thêm Phase 0).

### 2.3 Async generator
- Verify: `bất đồng bộ hàm* name() {}` parse đúng với `async: true, generator: true`.
- Test: `for await (v của asyncGen())`.

### 2.4 Optional chaining edge cases
- `obj?.()` — optional call.
- `obj?.[x]` — optional computed member.
- Test chain: `a?.b?.c`.

### 2.5 Logical assignment
- Thêm tokens nếu thiếu: `||=`, `&&=`, `??=`.
- Parse như `AssignmentExpression` với operator tương ứng.

### 2.6 Numeric literals nâng cao
- Regex tokenizer: hex `0x[0-9a-fA-F]+`, octal `0o[0-7]+`, binary `0b[01]+`.
- BigInt `123n` (suffix `n`).
- Numeric separator `1_000_000`.

### 2.7 Regex literal
- Tokenizer: `/pattern/flags`, phân biệt với division bằng context (sau operator/keyword = regex, sau expression = division).
- AST: `RegExpLiteral { pattern, flags }`.

### 2.8 Escape sequences trong string
- `\n`, `\t`, `\r`, `\\`, `\"`, `\'`, `\0`, `\xFF`, `\u00E1`, `\u{1F600}`.
- Test đầy đủ.

### 2.9 Comment handling
- Verify tokenizer skip `//` và `/* */`.
- Preserve comment trong AST (optional, cho future codegen giữ comment).
- Test: comment ở đủ vị trí (sau statement, giữa expression, đầu file).

### 2.10 Labeled break/continue
- `nhãn: lặp (...) {}` + `phá vòng lặp nhãn` / `tiếp tục nhãn`.
- Test với nested loop.

### 2.11 Hoàn thiện codegen test cho node đã có
- Rà soát: node nào có parser test nhưng chưa có codegen test → bổ sung.
- Đặc biệt: ForStatement, WhileStatement, DoWhileStatement, TryStatement, ThrowStatement, BreakStatement, ContinueStatement, LabelledStatement, WithStatement.

**Acceptance:**
- [compatibility.md](./compatibility.md) không còn 🟡 ở cột P2.
- Coverage ≥85% statements.

---

## 5. Phase 3 — Identifier mangling (3-5 ngày)

### 3.1 Thay cơ chế
- Xóa logic codepoint encoding hiện tại.
- Quy tắc mới:
  1. Replace ` ` (space) → `_`.
  2. Giữ nguyên Unicode char.
  3. Nếu ký tự không hợp lệ JS identifier → encode `\u{xxxx}`.
  4. Nếu sau mangling trùng với identifier khác trong cùng scope → throw `VietScriptError: tên "xin chào" trùng với "xin_chào" sau khi chuyển đổi`.

### 3.2 Collision detection
- Trong mỗi scope (function, block, module), trước khi codegen: build set mangled names, detect trùng.
- Trả error với **cả 2 vị trí** nguồn.

### 3.3 Reserved word handling
- Nếu identifier sau mangling trùng JS reserved (`if`, `class`, ...) → throw error. User phải đặt tên khác.
- Lý do: an toàn hơn là auto-rename.

### 3.4 Test
- Mọi identifier tiếng Việt trong test suite cũ phải giữ nguyên behavior (update snapshot output).
- Thêm test: collision, reserved word, multi-word với dấu.

### 3.5 Update docs + example
- [docs/basics/variables.md](./basics/variables.md): thêm section "cách tên biến được dịch sang JS".

**Acceptance:**
- Output JS của sandbox đọc được, không còn `_ch224o`.
- Tất cả snapshot test cập nhật và pass.
- 3 test collision/reserved word mới.

---

## 6. Phase 4 — Source map + error quality (1 tuần)

Quan trọng cho DX khi chạy thật — stack trace phải trỏ về file `.vjs` gốc.

### 4.1 Source map generation
- Parser phải track `loc: { line, column }` trên mọi AST node (verify có sẵn, bổ sung nếu thiếu).
- `@babel/generator` có option `sourceMaps: true` — sử dụng.
- Output: `file.vjs.map` v3 source map spec.

### 4.2 Error messages
Chuẩn hóa format error tiếng Việt:
```
VietScriptError: <mô tả>
  tại file.vjs:12:5
       10 |  hàm tính(a, b) {
       11 |    khai báo tổng = a + b
     > 12 |    trả về tổng +
          |                ^
       13 |  }
  gợi ý: thiếu biểu thức sau dấu '+'
```
- Class `VietScriptError` với `file`, `line`, `column`, `snippet`, `hint`.
- Catch tại mọi `throw new Error(...)` trong parser → replace với `VietScriptError`.
- Rà hết parser để add `hint` cho lỗi phổ biến.

### 4.3 Runtime error remapping
- Khi chạy JS output có source map, Node 22+ / Bun tự đọc source map cho stack trace.
- Test: `throw` trong `.vjs`, stack trace phải hiện `file.vjs:line`.

**Acceptance:**
- `node --enable-source-maps output.js` → error trỏ về `.vjs`.
- Syntax error trong `.vjs` in ra format đẹp có snippet + hint.
- Test: ≥10 error case khác nhau.

---

## 7. Phase 5 — CLI + Node loader (1-2 tuần)

Đây là thứ biến dự án từ "demo" thành "dùng được".

### 7.1 Package mới: `packages/cli`
- Binary name: `vietscript` (ngắn: `vjs`).
- Sub-command:
  - `vietscript run file.vjs` — parse + codegen + chạy ngay qua Node.
  - `vietscript build src/` — build cả thư mục, output JS + source map.
  - `vietscript watch src/` — watch mode, rebuild on change.
  - `vietscript check file.vjs` — parse only, báo lỗi không chạy.
- Stack: `commander` cho parsing args, `chokidar` cho watch.

### 7.2 Node.js ESM loader
- File: `packages/cli/loader.mjs`.
- Dùng Node loader hooks API (Node 20+).
- Khi `import "./file.vjs"`: loader parse → codegen → trả JS.
- Cho phép: `node --loader @vietscript/cli/loader ./main.vjs` chạy thẳng `.vjs`.

### 7.3 Bun support
- Bun có `Bun.plugin({ loader })` API.
- File: `packages/cli/bun-plugin.ts`.
- Usage: `bun run --preload @vietscript/cli/bun-plugin main.vjs`.

### 7.4 `vietscript init`
- Tạo `vietscript.config.json` với default (entry, outDir, target).
- Tạo `src/main.vjs` mẫu.

### 7.5 Error handling
- CLI catch `VietScriptError`, in đẹp.
- Exit code != 0 nếu có lỗi (cho CI).

**Acceptance:**
- `npm i -g @vietscript/cli && vietscript run examples/hello.vjs` in ra "Xin chào".
- Watch mode tự rebuild khi sửa file.
- `node --loader @vietscript/cli/loader main.vjs` chạy OK.
- `bun main.vjs` (sau preload) chạy OK.

---

## 8. Phase 6 — Plugin Vite/Webpack + sample project (1 tuần)

Verify plugin đã có chạy với project thật, không chỉ unit test.

### 8.1 Plugin Vite
- Review [packages/plugins/vite](../packages/plugins/vite).
- Test với Vite 5 + React app.
- HMR: sửa `.vjs` → browser reload đúng.

### 8.2 Plugin Webpack
- Review [packages/plugins/webpack](../packages/plugins/webpack).
- Test với Webpack 5 + vanilla JS.

### 8.3 Sample app
- Thư mục mới: `examples/todo-app/`.
- Nội dung: app todo nhỏ, viết 100% bằng VietScript, dùng Vite + React.
- Deploy lên Vercel/Netlify — có URL live trong README.

### 8.4 Sample Node server
- Thư mục mới: `examples/node-server/`.
- Express app viết bằng VietScript, chạy qua `vietscript run` hoặc loader.

**Acceptance:**
- 2 sample project chạy thật, có URL / screenshot trong README.
- README có badge "dùng trong production" (trong app demo của chính dự án).

---

## 9. Phase 7 — Stdlib mỏng (3-5 ngày)

Ngôn ngữ có "hồn" khi có thể viết **hoàn toàn tiếng Việt**. Stdlib là tập hàm wrap JS globals.

### 9.1 Package mới: `packages/stdlib`
- Auto-import trong CLI run mode (`import * from '@vietscript/stdlib'` tự động).

### 9.2 Nội dung (minimal)
```
in(...args)          → console.log
đọc(prompt)          → prompt (browser) / readline (Node)
tự_số(s)             → Number(s)
tự_chuỗi(x)          → String(x)
loại_của(x)          → typeof x
độ_dài(x)            → x.length
```

### 9.3 Array methods alias
- Không wrap hết, chỉ thêm alias cho method phổ biến:
  - `mảng.thêm()` → `Array.prototype.push`
  - `mảng.bớt()` → `Array.prototype.pop`
  - `mảng.với_mỗi()` → `forEach`
  - `mảng.lọc()` → `filter`
  - `mảng.ánh_xạ()` → `map`

Implement qua prototype extension (polyfill) hoặc wrapper function. Chọn **wrapper function** để không pollute global.

### 9.4 Giới hạn scope
- Không làm: Promise wrapper, Date wrapper, Math wrapper. Để dành post-v1.
- Không làm: I/O framework riêng.

**Acceptance:**
- Viết được full sample: "hello world" 100% tiếng Việt, không có identifier tiếng Anh nào.
- Docs `docs/stdlib.md` liệt kê hết API.

---

## 10. Phase 8 — Docs & examples (1 tuần)

### 10.1 Tái cấu trúc docs
Hiện tại docs ở [docs/basics/](./basics/) rời rạc. Cấu trúc mới:
```
docs/
├── index.md              (landing)
├── introduction.md       (giữ)
├── getting-started.md    (cập nhật: cài CLI, chạy file đầu tiên)
├── language/             (ngôn ngữ)
│   ├── variables.md
│   ├── operators.md
│   ├── control-flow.md   (if + switch + ternary)
│   ├── loops.md          (for + while + for...of/in)
│   ├── functions.md      (thường + arrow + async + generator)
│   ├── classes.md
│   ├── modules.md        (import/export)
│   ├── error-handling.md (try/catch/throw)
│   ├── destructuring.md
│   └── template-literals.md
├── stdlib.md
├── cli.md
├── plugins.md            (Vite + Webpack + Bun)
├── compatibility.md      (giữ, đã có)
├── differences-from-js.md (mới — liệt kê minh bạch cái nào khác JS)
└── roadmap.md            (file này)
```

### 10.2 Mỗi trang phải có
- Giới thiệu 1 đoạn.
- Cú pháp VietScript + **JS tương ứng** đặt cạnh nhau (block code 2 cột hoặc 2 block liền kề).
- ≥2 ví dụ chạy được.
- Link đến playground với ví dụ đó pre-fill.

### 10.3 Migration guide
- `docs/migration-from-js.md`: đoạn JS → VietScript tương đương (10-15 ví dụ).

### 10.4 Playground
- Update playground load các example mới trong `examples/`.
- Nút "Copy as JS" xem ngay output.

**Acceptance:**
- Mọi mục trong [compatibility.md](./compatibility.md) có ít nhất 1 link đến trang docs giải thích.
- 10+ ví dụ runnable trong playground.

---

## 11. Phase 9 — Release v1.0 (2-3 ngày)

### 11.1 Version + changelog
- Set version `1.0.0` cho tất cả package.
- `CHANGELOG.md`: liệt kê mọi thay đổi từ trạng thái hiện tại.

### 11.2 NPM publish
- Publish public: `@vietscript/parser`, `@vietscript/shared`, `@vietscript/cli`, `@vietscript/stdlib`, `@vietscript/vite-plugin`, `@vietscript/webpack-plugin`.
- Test: install vào project trống, chạy được.

### 11.3 README ở root
- Rewrite: "VietScript là ngôn ngữ tiếng Việt transpile ra JS. Chạy trên browser/Node/Bun."
- Quick start 5 dòng.
- Link docs + playground + sample apps.

### 11.4 Announcement
- Bài viết ngắn (vn + en) về dự án.
- Đăng: Twitter/X, Reddit r/programming, dev.to, HackerNews (nếu muốn).
- Nhắm mạnh cộng đồng dev Việt trước.

### 11.5 Post-release
- Tạo issue template, PR template trên GitHub.
- Monitor issue đầu tiên trong 2 tuần, fix bug.

**Acceptance:**
- Package có trên npm, tải về chạy được.
- README có badge version, CI status, coverage.
- Sample app có URL live.

---

## 12. Post-v1 backlog (không làm trong scope này)

Ghi lại để không quên, nhưng không đụng trước khi xong v1:

- **TypeScript annotation** — syntax có sẵn trong specs nhưng parser chưa handle. Cần decide: transpile strip types, hay generate .d.ts?
- **LSP server** — autocomplete + go-to-definition trong VS Code.
- **Formatter** (`vietscript fmt`).
- **REPL** (`vietscript repl`).
- **Decorators**.
- **Pattern matching** (proposal stage).
- **Native compilation** via AssemblyScript / TinyGo (thử nghiệm).
- **Translator** JS → VietScript tự động (ngược chiều hiện tại).
- **Stdlib mở rộng**: Promise, Date, Math, Fetch wrapper.
- **Mobile** — React Native example.

---

## 13. Rủi ro & đối phó

| Rủi ro | Ảnh hưởng | Đối phó |
|---|---|---|
| Destructuring + pattern phức tạp hơn dự kiến, lan sang các node khác | Phase 1 kéo dài | Làm `ObjectPattern`/`ArrayPattern` trước, isolated test, rồi mới wire vào VariableDeclaration và ParameterList |
| Tokenizer regex xung đột khi thêm regex literal | Parse lỗi khắp nơi | Context-aware tokenizer: track "expect expression" state. Test regression cho mọi file test cũ |
| Keyword tiếng Việt mới xung đột với identifier có sẵn | Break code user | Giữ alias tiếng Anh. Thêm flag `--strict-vietnamese` bật ở v1.x sau |
| Source map cần `loc` chi tiết mà hiện tại AST không track | Phase 4 rework parser | Audit từng node ở cuối Phase 2, bổ sung `loc` trước khi vào Phase 4 |
| `@babel/generator` output không khớp syntax VietScript cần | Phải tự viết printer | Kiểm tra ngay đầu Phase 1 bằng test codegen cho mọi feature mới. Nếu có case không hỗ trợ, fork hoặc tự viết printer cho node đó |
| Scope phình | Không release được | Backlog post-v1 là cứng. Nếu thấy muốn làm, ghi vào backlog và đi tiếp |
| Solo developer burnout | Dự án stall | Scope nhỏ mỗi phase, release từng phase lên branch, có cảm giác tiến triển |

---

## 14. Tracking

- Mỗi phase = 1 GitHub Milestone.
- Mỗi task trong phase = 1 Issue.
- Mỗi feature P1/P2 = 1 PR.
- [compatibility.md](./compatibility.md) update sau mỗi PR merge.
- Cuối mỗi phase: cập nhật `CHANGELOG.md` (unreleased section).

---

## 15. Tóm lược số liệu mục tiêu v1.0

- **Cú pháp JS cover:** 95%+ (xem compatibility matrix).
- **Coverage:** ≥85% statements.
- **CLI:** chạy được trên Node 20+, Bun 1.1+.
- **Runtime:** chạy trên Chrome/Firefox/Safari/Edge (≥2024), Node 20+, Bun 1.1+.
- **Sample apps:** ≥2 (todo web, node server) có URL live.
- **Docs:** 100% mục trong matrix có trang giải thích.
- **NPM:** 6 package publish với version 1.0.0.

---

## 16. Làm gì ngay sau khi bạn approve

1. Tạo GitHub milestone cho Phase 0-9.
2. Tạo issue cho Phase 0 (5 task con).
3. Bắt đầu với Phase 0.1 (coverage reporter) — có số đo để theo dõi tiến độ.

Không làm gì khác trước khi bạn review roadmap này.
