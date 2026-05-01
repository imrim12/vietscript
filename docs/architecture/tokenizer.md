# Kiến trúc Tokenizer

Tokenizer của VietScript là một **state machine** chạy thủ công trên chuỗi nguồn `.vjs`, kết hợp **trie ký tự** cho keyword và toán tử, cùng **bounded backtracking** cho identifier đa-từ. Trang này mô tả thiết kế, các thành phần chính, và cách thêm keyword mới.

- File: [`packages/parser/src/tokenizer.ts`](https://github.com/imrim12/vietscript/blob/main/packages/parser/src/tokenizer.ts)
- API: `getNextToken()`, `isEOF()`, `rollback(step)`, `getCursor()`.

## Vòng lặp chính

`getNextToken()` đọc `source.charCodeAt(cursor)` rồi rẽ nhánh trực tiếp theo char-code:

```
DEFAULT
 ├── whitespace      → skip
 ├── '/' '/'          → line comment, skip đến '\n'
 ├── '/' '*'          → block comment, skip đến '*/'
 ├── '`'              → scanTemplateLiteral
 ├── '/' (regex ctx)  → scanRegexLiteral
 ├── '"' | "'"        → scanString
 ├── digit | '.digit' → scanNumber
 ├── ident-start      → scanIdentifierOrKeyword
 └── otherwise        → scanOperator (longest-match trie)
```

Không có cấp phát chuỗi tạm và không gọi regex engine trong hot path — chỉ index vào source qua `charCodeAt`.

## Keyword trie

Tất cả keyword (English + Vietnamese aliases) được build thành **một trie** keyed theo char-code, kể cả ký tự space cho keyword đa-từ như `khai báo`, `phá vòng lặp`, `kiểu của`, `khởi tạo cha`, `không xác định`.

Mỗi entry mang một quy tắc biên (boundary) để xác định xem một keyword có thực sự đứng độc lập hay đang đứng cạnh ký tự định danh khác:

| Boundary | Ý nghĩa | Ví dụ keyword |
|---|---|---|
| `WORD` | Char tiếp theo không được là `[A-Za-z0-9_]` (giả lập JS `\b`) | `var`, `let`, `for`, `khai báo`, `nếu` |
| `IDENT` | Char tiếp theo không được là `[A-Za-zÀ-ỹ]` (cho keyword VI kết thúc bằng ký tự non-ASCII) | `riêng tư`, `bảo vệ`, `chờ`, `khi mà` |
| `NONE` | Không kiểm tra biên (cho keyword có thể đứng cạnh identifier khác) | `else`, `return`, `try`, `as`, `from`, `const`, `async` |

Lookup là một vòng đơn đi xuống trie:

```
1. Bắt đầu ở root, vị trí p = cursor.
2. Đọc charCodeAt(p), bước xuống child tương ứng.
3. Nếu node có .type và boundary qua → ghi nhận match dài nhất.
4. Lặp đến khi không còn child khớp.
5. Trả về match dài nhất (nếu có).
```

Độ phức tạp: O(L) với L = độ dài keyword dài nhất (hằng số). Không phụ thuộc số keyword.

## Backtracking giới hạn cho identifier đa-từ

VietScript cho phép identifier đa-từ ngăn cách bằng space, ví dụ `con mèo đẹp = 1`. Tokenizer cần phân biệt:

- `khai báo con mèo đẹp = 1` → `[VAR, IDENT('con mèo đẹp'), '=', ...]`
- `khai báo một lớp gì đó = 1` → phải dừng identifier trước `lớp` (vì `lớp` là keyword), tạo lỗi syntax có chủ đích.

Logic ở `scanIdentifier`:

```
1. Đọc word đầu (ident-start, ident-cont*).
2. Loop:
   - Nếu next char là space và char sau space là ident-start:
     - Peek: từ vị trí sau-space, gọi matchKeyword().
     - Nếu thấy keyword → DỪNG, không nuốt space.
     - Nếu không → consume space + word, continue.
   - Else → DỪNG.
```

Đây là backtracking **bounded**: peek tối đa độ dài keyword dài nhất (hằng số), không phải full backtracking parser.

## Operator longest-match trie

Tương tự keyword trie nhưng cho dấu toán tử. Đảm bảo `>>>=` thắng `>>>`, `>>>` thắng `>>=`, `>>` thắng `>` v.v. — không phụ thuộc thứ tự khai báo trong mảng `OPERATORS`.

## Phân biệt regex literal vs phép chia

Tokenizer track `lastTokenType`. Nếu token trước đó nằm trong tập `REGEX_PRECEDING_TOKENS` (sau `=`, `(`, `,`, `return`, ...), `/` đầu = regex literal; ngược lại = toán tử chia.

## Template literal & regex literal

Hai phần này được scan thủ công bằng `charCodeAt` lookup vì chúng có nội tại nested:

- **Template literal** hỗ trợ `${ ... }` lồng nhau, bên trong có thể chứa template literal khác (đệ quy qua một stack độ sâu).
- **Regex literal** hỗ trợ character class `[...]` (slash bên trong không kết thúc regex), escape `\/`, và flags `[a-z]*` ở cuối.

## Bench

```bash
pnpm bench                    # chạy bench, in bảng so sánh giữa các fixture
pnpm bench:baseline           # chạy bench, dump JSON vào packages/parser/bench/baseline.json
```

File bench:
- [`packages/parser/src/__bench__/tokenizer.bench.ts`](https://github.com/imrim12/vietscript/blob/main/packages/parser/src/__bench__/tokenizer.bench.ts) — bench tokenizer trên 5 fixture (tiny / medium / keywordHeavy / stringHeavy / large).
- [`packages/parser/src/__bench__/parser.bench.ts`](https://github.com/imrim12/vietscript/blob/main/packages/parser/src/__bench__/parser.bench.ts) — bench end-to-end parse.
- [`packages/parser/src/__bench__/fixtures/`](https://github.com/imrim12/vietscript/blob/main/packages/parser/src/__bench__/fixtures) — source `.vjs` đại diện.

Khi thay đổi tokenizer, chạy bench trước/sau và commit kèm PR để dễ review.

## Kiểm chứng

3 lớp test bảo vệ hành vi:

1. **Tokenizer behavior** — `tokenizer-edge.test.ts`, `vietnamese-keywords.test.ts`, `identifier-match-keyword.test.ts` cover edge cases trực tiếp.
2. **Snapshot drift** — `bench-fixture-snapshot.test.ts` cố định output token (type|value|start-end) cho mỗi fixture. Sửa tokenizer mà ra output khác → test fail và phải xem lại.
3. **Smoke** — `bench-fixture-parity.test.ts` đảm bảo mọi fixture tokenize được đến EOF không lỗi.

Cộng thêm 70+ parser tests gián tiếp cover tokenizer qua từng node loại AST.

## Thêm keyword mới

1. Thêm vào enum: [`packages/shared/parser/keyword.enum.ts`](https://github.com/imrim12/vietscript/blob/main/packages/shared/parser/keyword.enum.ts).
2. Thêm entry vào mảng `KEYWORDS` ở đầu `tokenizer.ts`. Chọn `boundary` đúng:
   - `WORD` cho keyword ASCII (mô phỏng `\b`).
   - `IDENT` cho keyword VI kết thúc bằng ký tự non-ASCII (vì `\b` không hoạt động trên Unicode).
   - `NONE` chỉ khi cố ý cho phép keyword đứng cạnh identifier khác.
3. Thêm test trong `vietnamese-keywords.test.ts` (1 case dùng EN, 1 case dùng VI).
4. Chạy `pnpm test` (full suite) + `pnpm bench` (kiểm tra không regression).

## Tài liệu liên quan

- [Roadmap](../roadmap.md) — phần Phase 0 ghi keyword EN + VI policy.
- [Compatibility matrix](../compatibility.md) — trạng thái cú pháp.
- Source: `packages/parser/src/tokenizer.ts`, `packages/parser/src/parser.ts`.
