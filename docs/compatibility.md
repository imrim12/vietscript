# Ma trận tương thích cú pháp

Đây là **nguồn sự thật duy nhất** về cú pháp nào VietScript đã hỗ trợ, đang làm dở, hay chưa có. Mọi thay đổi parser/codegen đều phải cập nhật trang này.

## Kiến trúc pipeline

```
Source .vjs  →  Tokenizer  →  Parser  →  Babel-compatible AST  →  @babel/generator  →  JavaScript
```

Vì AST theo chuẩn Babel, codegen dùng sẵn `@babel/generator` — mọi cú pháp JS mà Babel hỗ trợ thì codegen "miễn phí". Công việc hoàn thiện chủ yếu nằm ở **parser** (tokenize + build đúng shape AST) và **test**.

## Quy ước ký hiệu

| Ký hiệu | Ý nghĩa |
|---|---|
| ✅ | Hoàn thiện: parser + codegen + test positive + test codegen đều có |
| 🟡 | Một phần: parse được nhưng thiếu test, thiếu edge case, hoặc codegen output chưa đúng |
| ❌ | Chưa hỗ trợ: parse sẽ throw hoặc sinh AST sai |
| — | Không áp dụng |

## Ưu tiên

- **P1** — Cốt lõi JS hiện đại, không có thì ngôn ngữ "thiếu"
- **P2** — Dang dở, cần hoàn thiện để ổn định
- **P3** — Niche, có thể hoãn sau

---

## 1. Khai báo biến

| Feature | JS | VietScript | Parser | Codegen | Test | Ưu tiên | Ghi chú |
|---|---|---|:---:|:---:|:---:|:---:|---|
| `var` | `var x = 1` | `khai báo x = 1` | ✅ | ✅ | ✅ | — | |
| `let` | `let x = 1` | `let x = 1` | ✅ | ✅ | ✅ | — | Chưa có từ tiếng Việt |
| `const` | `const x = 1` | `hằng số x = 1` | ✅ | ✅ | ✅ | — | |
| Multi-declarator | `let a = 1, b` | `let a = 1, b` | ✅ | ✅ | ✅ | — | |
| Destructuring object | `const {a,b} = o` | `hằng số {a,b} = o` | ✅ | ✅ | ✅ | — | |
| Destructuring array | `const [a,b] = arr` | `hằng số [a,b] = arr` | ✅ | ✅ | ✅ | — | Hỗ trợ hole, default, rest, nested |
| Destructuring default | `const {a=1} = o` | `hằng số {a=1} = o` | ✅ | ✅ | ✅ | — | |
| Destructuring rename | `const {a:b} = o` | `hằng số {a:b} = o` | ✅ | ✅ | ✅ | — | |
| Destructuring nested | `const {a:{b}} = o` | `hằng số {a:{b}} = o` | ✅ | ✅ | ✅ | — | |
| Destructuring rest | `const {a,...rest} = o` | `hằng số {a,...rest} = o` | ✅ | ✅ | ✅ | — | |
| Destructuring params | `f({a,b})` | `hàm f({a,b})` | ✅ | ✅ | ✅ | — | |

## 2. Hàm

| Feature | JS | VietScript | Parser | Codegen | Test | Ưu tiên | Ghi chú |
|---|---|---|:---:|:---:|:---:|:---:|---|
| Function declaration | `function f(){}` | `hàm f(){}` | ✅ | ✅ | ✅ | — | |
| Function expression | `const f = function(){}` | `khai báo f = hàm(){}` | ✅ | ✅ | ✅ | — | |
| Arrow function | `() => x` | `() => x` | ✅ | ✅ | ✅ | — | |
| Arrow với body | `() => { return x }` | `() => { trả về x }` | ✅ | ✅ | ✅ | — | |
| Default params | `f(a = 1)` | `f(a = 1)` | ✅ | ✅ | ✅ | — | |
| Rest params | `f(...args)` | `f(...args)` | ✅ | ✅ | ✅ | — | Chỉ cho phép ở vị trí cuối |
| Destructuring params | `f({a,b})` | `hàm f({a,b})` | ✅ | ✅ | ✅ | — | Covered trong object/array pattern tests |
| Async function | `async function f(){}` | `bất đồng bộ hàm f(){}` | ✅ | ✅ | ✅ | — | |
| Generator | `function* g(){}` | `hàm* g(){}` | ✅ | ✅ | ✅ | — | |
| Async generator | `async function* g(){}` | `bất đồng bộ hàm* g(){}` | ✅ | ✅ | ✅ | — | |
| `return` | `return x` | `trả về x` | ✅ | ✅ | ✅ | — | |
| `yield` | `yield x` | `nhường x` | ✅ | ✅ | ✅ | — | |
| `yield*` | `yield* g()` | `nhường* g()` | ✅ | ✅ | ✅ | — | |
| `await` | `await p` | `chờ p` | ✅ | ✅ | ✅ | — | |

## 3. Điều kiện

| Feature | JS | VietScript | Parser | Codegen | Test | Ưu tiên | Ghi chú |
|---|---|---|:---:|:---:|:---:|:---:|---|
| if | `if (c) {}` | `nếu (c) {}` | ✅ | ✅ | ✅ | — | |
| if-else | `if (c) {} else {}` | `nếu (c) {} không thì {}` | ✅ | ✅ | ✅ | — | |
| else-if chain | `else if (c)` | `không thì nếu (c)` | ✅ | ✅ | ✅ | — | |
| Ternary | `c ? a : b` | `c ? a : b` | ✅ | ✅ | ✅ | — | ConditionalExpression AST |
| switch | `switch(x) {}` | `duyệt (x) {}` | ✅ | ✅ | ✅ | — | |
| case | `case 1:` | `trường hợp 1:` | ✅ | ✅ | ✅ | — | |
| default case | `default:` | `mặc định:` | ✅ | ✅ | ✅ | — | |
| case fall-through | multiple `case:` | multiple `trường hợp:` | ✅ | ✅ | ✅ | — | |

## 4. Vòng lặp

| Feature | JS | VietScript | Parser | Codegen | Test | Ưu tiên | Ghi chú |
|---|---|---|:---:|:---:|:---:|:---:|---|
| for truyền thống | `for (i=0; i<n; i++)` | `lặp (i=0; i<n; i++)` | ✅ | ✅ | ✅ | — | |
| for...in | `for (k in o)` | `lặp (biến k trong o)` | ✅ | ✅ | ✅ | — | |
| for...of | `for (v of arr)` | `lặp (biến v của arr)` | ✅ | ✅ | ✅ | — | Hỗ trợ destructuring pattern |
| for-await...of | `for await (v of arr)` | `lặp chờ (biến v của arr)` | ✅ | ✅ | ✅ | — | |
| while | `while (c) {}` | `khi mà (c) {}` | ✅ | ✅ | ✅ | — | |
| do...while | `do {} while (c)` | `thực hiện {} khi mà (c)` | ✅ | ✅ | ✅ | — | |
| break | `break` | `phá vòng lặp` | ✅ | ✅ | ✅ | — | |
| continue | `continue` | `tiếp tục` | ✅ | ✅ | ✅ | — | |
| Labeled break/continue | `break label` | `phá vòng lặp label` | ✅ | ✅ | ✅ | — | Fix bug: ContinueStatement ăn nhầm BREAK keyword |

## 5. Lớp

| Feature | JS | VietScript | Parser | Codegen | Test | Ưu tiên | Ghi chú |
|---|---|---|:---:|:---:|:---:|:---:|---|
| Class declaration | `class A {}` | `lớp A {}` | ✅ | ✅ | ✅ | — | |
| Kế thừa | `class A extends B` | `lớp A kế thừa B` | ✅ | ✅ | ✅ | — | Có cả syntax `lớp A (B)` |
| Constructor | `constructor(){}` | `khởi tạo(){}` | ✅ | ✅ | ✅ | — | |
| super call | `super()` | `khởi tạo cha()` | ✅ | ✅ | ✅ | — | |
| Instance method | `foo(){}` | `foo(){}` | ✅ | ✅ | ✅ | — | |
| Class property | `x = 1` | `x = 1` | ✅ | ✅ | ✅ | — | |
| Static method | `static foo(){}` | `tĩnh foo(){}` | ✅ | ✅ | ✅ | — | |
| Static property | `static x = 1` | `tĩnh x = 1` | ✅ | ✅ | ✅ | — | |
| Access modifier | `private x` | `riêng tư x` | ✅ | ✅ | ✅ | — | Accessibility field in AST |
| Private field | `#x` | `#x` | ✅ | ✅ | ✅ | — | Sinh ra `ClassPrivateProperty` |
| Getter | `get x(){}` | `lấy x(){}` | ✅ | ✅ | ✅ | — | |
| Setter | `set x(v){}` | `gán x(v){}` | ✅ | ✅ | ✅ | — | |
| Async method | `async foo(){}` | `bất đồng bộ foo(){}` | ✅ | ✅ | ✅ | — | |
| Generator method | `*foo(){}` | `*foo(){}` | ✅ | ✅ | ✅ | — | |

## 6. Module (Import/Export)

| Feature | JS | VietScript | Parser | Codegen | Test | Ưu tiên | Ghi chú |
|---|---|---|:---:|:---:|:---:|:---:|---|
| Side-effect import | `import "x"` | `sử dụng "x"` | ✅ | ✅ | ✅ | — | |
| Default import | `import a from "x"` | `sử dụng a từ "x"` | ✅ | ✅ | ✅ | — | |
| Named import | `import {a} from "x"` | `sử dụng {a} từ "x"` | ✅ | ✅ | ✅ | — | |
| Namespace import | `import * as a from "x"` | `sử dụng * như là a từ "x"` | ✅ | ✅ | ✅ | — | |
| Aliased named import | `import {a as b} from "x"` | `sử dụng {a như là b} từ "x"` | ✅ | ✅ | ✅ | — | |
| Named export | `export {a}` | `cho phép {a}` | ✅ | ✅ | ✅ | — | |
| Default export | `export default a` | `cho phép mặc định a` | ✅ | ✅ | ✅ | — | |
| Re-export all | `export * from "x"` | `cho phép * từ "x"` | ✅ | ✅ | ✅ | — | |
| Re-export named | `export {a} from "x"` | `cho phép {a} từ "x"` | ✅ | ✅ | ✅ | — | |
| Dynamic import | `import("x")` | `sử dụng("x")` | ✅ | ✅ | ✅ | — | |
| Import assertions | `import ... assert {}` | chưa có | ❌ | ❌ | ❌ | P3 | |

## 7. Xử lý lỗi

| Feature | JS | VietScript | Parser | Codegen | Test | Ưu tiên | Ghi chú |
|---|---|---|:---:|:---:|:---:|:---:|---|
| try/catch | `try {} catch(e){}` | `thử {} bắt lỗi(e){}` | ✅ | ✅ | ✅ | — | |
| try/finally | `try {} finally {}` | `thử {} cuối cùng {}` | ✅ | ✅ | ✅ | — | |
| try/catch/finally | full 3-block | full 3-block | ✅ | ✅ | ✅ | — | |
| Optional catch binding | `catch {}` | `bắt lỗi {}` | ✅ | ✅ | ✅ | — | |
| throw | `throw e` | `báo lỗi e` | ✅ | ✅ | ✅ | — | |

## 8. Biểu thức

| Feature | JS | VietScript | Parser | Codegen | Test | Ưu tiên | Ghi chú |
|---|---|---|:---:|:---:|:---:|:---:|---|
| Binary arithmetic | `+ - * / % **` | giống JS | ✅ | ✅ | ✅ | — | |
| Comparison | `=== !== == != < <=` | giống JS | ✅ | ✅ | ✅ | — | |
| Logical | `&& \|\| !` | giống JS | ✅ | ✅ | ✅ | — | |
| Nullish coalescing | `a ?? b` | `a ?? b` | ✅ | ✅ | ✅ | — | |
| Bitwise | `& \| ^ ~ << >> >>>` | giống JS | ✅ | ✅ | ✅ | — | |
| Assignment ops | `= += -= ...` | giống JS | ✅ | ✅ | ✅ | — | |
| Logical assignment | `\|\|= &&= ??=` | giống JS | ✅ | ✅ | ✅ | — | |
| Update | `++ --` | giống JS | ✅ | ✅ | ✅ | — | Cả prefix + postfix |
| `typeof` | `typeof x` | `kiểu của x` | ✅ | ✅ | ✅ | — | |
| `instanceof` | `x instanceof A` | `x là kiểu A` | ✅ | ✅ | ✅ | — | |
| `in` | `k in o` | `k trong o` | ✅ | ✅ | ✅ | — | Phân biệt với for...in qua context |
| `delete` | `delete o.x` | `xoá o.x` | ✅ | ✅ | ✅ | — | |
| `void` | `void 0` | `void 0` | ✅ | ✅ | ✅ | — | |
| Member (dot) | `o.x` | `o.x` | ✅ | ✅ | ✅ | — | |
| Member (bracket) | `o["x"]` | `o["x"]` | ✅ | ✅ | ✅ | — | |
| Optional chaining | `o?.x` | `o?.x` | ✅ | ✅ | ✅ | — | Hỗ trợ `?.b`, `?.[k]`, chained |
| Call | `f(a, b)` | `f(a, b)` | ✅ | ✅ | ✅ | — | |
| New | `new A()` | `new A()` | ✅ | ✅ | ✅ | — | NewExpression với args + SpreadElement |
| this | `this` | `đây` | ✅ | ✅ | ✅ | — | |
| super | `super.x` | `khởi tạo cha.x` | ✅ | ✅ | ✅ | — | |
| Array literal | `[1,2,3]` | `[1,2,3]` | ✅ | ✅ | ✅ | — | |
| Object literal | `{a:1}` | `{a:1}` | ✅ | ✅ | ✅ | — | |
| Shorthand property | `{a}` | `{a}` | ✅ | ✅ | ✅ | — | |
| Computed key | `{[k]:1}` | `{[k]:1}` | ✅ | ✅ | ✅ | — | |
| Object method | `{foo(){}}` | `{foo(){}}` | ✅ | ✅ | ✅ | — | |
| Object getter/setter | `{get x(){}}` | `{lấy x(){}}` | ✅ | ✅ | ✅ | — | |
| Spread array | `[...a]` | `[...a]` | ✅ | ✅ | ✅ | — | |
| Spread object | `{...o}` | `{...o}` | ✅ | ✅ | ✅ | — | |
| Spread call | `f(...args)` | `f(...args)` | ✅ | ✅ | ✅ | — | |

## 9. Giá trị (Literals)

| Feature | JS | VietScript | Parser | Codegen | Test | Ưu tiên | Ghi chú |
|---|---|---|:---:|:---:|:---:|:---:|---|
| Số nguyên | `42` | `42` | ✅ | ✅ | ✅ | — | |
| Số thập phân | `3.14` | `3.14` | ✅ | ✅ | ✅ | — | |
| Scientific | `1e5` | `1e5` | ✅ | ✅ | ✅ | — | |
| Hex/Octal/Binary | `0xff 0o7 0b10` | giống JS | ✅ | ✅ | ✅ | — | |
| BigInt | `10n` | `10n` | ✅ | ✅ | ✅ | — | Hỗ trợ cả hex BigInt `0xffn` |
| Numeric separator | `1_000_000` | `1_000_000` | ✅ | ✅ | ✅ | — | |
| String `"..."` | `"hi"` | `"hi"` | ✅ | ✅ | ✅ | — | |
| String `'...'` | `'hi'` | `'hi'` | ✅ | ✅ | ✅ | — | |
| Escape sequences | `"\n \t \u00e1"` | giống JS | ✅ | ✅ | ✅ | — | Hỗ trợ `\n`, `\t`, `\r`, `\b`, `\f`, `\v`, `\0`, `\xFF`, `\uFFFF`, `\u{1F600}` |
| Template literal | `` `hi` `` | `` `hi` `` | ✅ | ✅ | ✅ | — | |
| Template interpolation | `` `${x}` `` | `` `${x}` `` | ✅ | ✅ | ✅ | — | Hỗ trợ nested braces, escape |
| Tagged template | `` tag`x${y}` `` | `` tag`x${y}` `` | ✅ | ✅ | ✅ | — | |
| Boolean | `true false` | `đúng sai` | ✅ | ✅ | ✅ | — | |
| null | `null` | `null` | ✅ | ✅ | ✅ | — | Chưa có từ tiếng Việt |
| undefined | `undefined` | `không xác định` | ✅ | ✅ | ✅ | — | |
| NaN | `NaN` | `NaN` | ✅ | ✅ | ✅ | — | |
| Infinity | `Infinity` | `vô cực` | ✅ | ✅ | ✅ | — | |
| Regex literal | `/x/g` | `/x/g` | ✅ | ✅ | ✅ | — | Context-sensitive tokenizer |

## 10. Câu lệnh khác

| Feature | JS | VietScript | Parser | Codegen | Test | Ưu tiên | Ghi chú |
|---|---|---|:---:|:---:|:---:|:---:|---|
| Block | `{ ... }` | `{ ... }` | ✅ | ✅ | ✅ | — | |
| Expression statement | `x;` | `x;` | ✅ | ✅ | ✅ | — | |
| Empty statement | `;` | `;` | ✅ | ✅ | ✅ | — | |
| Debugger | `debugger` | `debugger` | ✅ | ✅ | ✅ | — | |
| with | `with(o){}` | `with(o){}` | ✅ | ✅ | ✅ | — | Deprecated trong strict mode |
| Labeled | `label: stmt` | `label: stmt` | ✅ | ✅ | ✅ | — | |

## 11. Comment

| Feature | JS | VietScript | Parser | Codegen | Test | Ưu tiên | Ghi chú |
|---|---|---|:---:|:---:|:---:|:---:|---|
| Single-line | `// ...` | — | ✅ | — | ✅ | — | Bỏ qua trong tokenizer |
| Multi-line | `/* ... */` | — | ✅ | — | ✅ | — | |
| JSDoc | `/** ... */` | — | ❌ | — | ❌ | P3 | Có thể hoãn |

## 12. Tính năng chuyên biệt VietScript

| Feature | Trạng thái | Ghi chú |
|---|:---:|---|
| Identifier có dấu cách tiếng Việt | ✅ | `số chân`, `Con Mèo` — hoạt động |
| Identifier mangling (Babel output) | ✅ | Output dùng Unicode trực tiếp: `xin chào` → `xin_chào` |
| Source map | ✅ | Sinh qua `@babel/generator`, CLI run + build hỗ trợ |
| Custom element `<vi-script>` | 🟡 | Có declare, chưa implement đầy đủ ([index.ts](../packages/parser/src/index.ts)) |
| CLI | ✅ | `vietscript run/build/watch/check` |
| Vite plugin | 🟡 | Có package, cần test với project thật |
| Webpack loader | 🟡 | Tương tự |

---

## Bảng tổng hợp ưu tiên

### P1 — Phải có (Phase 1)

Những cú pháp này quyết định cảm giác "dùng được" của ngôn ngữ:

1. Arrow function (`=>`)
2. Destructuring (object + array, cả declaration lẫn param)
3. Spread/Rest (`...` trong array/object/call/param)
4. Template literal interpolation (`${...}`)
5. `for...of` / `for...in`
6. Default parameters (`f(a = 1)`)

### P2 — Hoàn thiện phần dang dở (Phase 2)

Cần cho ổn định, giảm surprise:

- Private field `#x`, getter/setter
- Optional chaining edge case (`?.()`, `?.[]`)
- Async generator, test đầy đủ cho yield/await
- Logical assignment (`||=`, `&&=`, `??=`)
- Hex/octal/binary numeric literal
- Regex literal
- Shorthand property, computed key object
- Escape sequences trong string
- Comment handling (xác minh + test)
- Labeled break/continue
- Hoàn thiện codegen test cho mọi node hiện có

### P3 — Niche, có thể hoãn

- Dynamic import, import assertion
- BigInt, tagged template
- Infinity literal explicit
- `void` operator
- `debugger`, `with` statement
- JSDoc

---

## Keyword tiếng Việt

Tất cả keyword JS đã có bản tiếng Việt tương đương (đã thêm trong Phase 0). Giữ alias tiếng Anh để không break code cũ.

| JS | Tiếng Việt |
|---|---|
| `var` | `khai báo` |
| `let` | `biến` |
| `const` | `hằng số` |
| `function` | `hàm` |
| `return` | `trả về` |
| `if/else` | `nếu` / `không thì` |
| `for` | `lặp` |
| `while` | `khi mà` |
| `do` | `thực hiện` |
| `break` | `phá vòng lặp` |
| `continue` | `tiếp tục` |
| `switch/case/default` | `duyệt` / `trường hợp` / `mặc định` |
| `try/catch/finally/throw` | `thử` / `bắt lỗi` / `cuối cùng` / `báo lỗi` |
| `class/extends/super/constructor` | `lớp` / `kế thừa` / `khởi tạo cha` / `khởi tạo` |
| `import/export/from/as` | `sử dụng` / `cho phép` / `từ` / `như là` |
| `async/await` | `bất đồng bộ` / `chờ` |
| `yield` | `nhường` |
| `this` | `đây` |
| `null` | `rỗng` |
| `undefined` | `không xác định` |
| `Infinity` | `vô cực` |
| `instanceof` | `là kiểu` |
| `typeof` | `kiểu của` |
| `in` (operator / for...in) | `trong` |
| `of` (for...of) | `của` |
| `delete` | `xoá` |
| `static` | `tĩnh` |
| `public/private/protected` | `công khai` / `riêng tư` / `bảo vệ` |
| `get/set` | `lấy` / `gán` |
| `true/false` | `đúng` / `sai` |

---

## Cập nhật matrix

Khi thêm/hoàn thiện 1 feature:

1. Đổi ký hiệu trong bảng tương ứng (❌ → 🟡 → ✅).
2. Nếu feature ảnh hưởng sang node khác (ví dụ destructuring ảnh hưởng `VariableDeclaration` lẫn `ParameterList`), cập nhật tất cả dòng liên quan.
3. Nếu thay đổi keyword tiếng Việt, cập nhật cả bảng "Từ tiếng Việt còn thiếu" và [keyword.enum.ts](../packages/shared/parser/keyword.enum.ts).
4. Cập nhật docs trong `docs/basics/` nếu có.
