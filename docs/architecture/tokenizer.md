# Kiến trúc Tokenizer

VietScript dùng một **state-machine tokenizer** (FSM) để chuyển source `.vjs` thành chuỗi token cho parser. Trang này mô tả thiết kế, các đánh đổi, cách bench, và cách chuyển về tokenizer cũ nếu cần (cho debug hoặc so sánh).

## Tóm tắt

- File: [`packages/parser/src/tokenizer-fsm.ts`](https://github.com/imrim12/vietscript/blob/main/packages/parser/src/tokenizer-fsm.ts)
- Hai tokenizer cùng tồn tại sau lần migrate:
  - `TokenizerFSM` — **mặc định**, state machine + keyword trie + bounded backtracking.
  - `Tokenizer` — phiên bản regex cũ, giữ lại cho parity testing và rollback nhanh.
- Chọn qua `new Parser({ tokenizer: 'fsm' | 'regex' })`. Mặc định `'fsm'`.
- Cả hai phát ra **cùng một chuỗi token** trên mọi input hợp lệ — đảm bảo bằng snapshot tests và bench-fixture parity tests.

## Vì sao đổi từ regex sang FSM

Tokenizer cũ lặp tuần tự ~80 cặp `[regex, tokenType]` cho **mỗi** token, kèm `String#split(';')` + `concat(';')` mỗi lần — cấp phát chuỗi mới và chạy regex engine với backtracking nội tại trên mọi spec.

Hệ quả thực tế (bench trên cùng máy, xem `packages/parser/bench/comparison.json`):

| Fixture | Kích thước | Regex (hz) | FSM (hz) | Speedup |
|---|---:|---:|---:|---:|
| tiny | 129 chars | 1,770 | 364,125 | **206×** |
| medium | 1,777 chars | 48 | 26,334 | **546×** |
| keywordHeavy | 2,511 chars | 33 | 20,107 | **609×** |
| stringHeavy | 1,410 chars | 143 | 69,160 | **484×** |
| large | 14,262 chars | 1.1 | 3,280 | **2,969×** |

Quan trọng hơn cả speedup tuyệt đối: tokenizer cũ có hành vi **siêu tuyến tính** (input × 110 → chậm × ~1,587). FSM gần như tuyến tính (input × 110 → chậm × ~107). Càng file lớn, khoảng cách càng giãn.

## Thiết kế

### 1. Dispatch theo char-code

Vòng `getNextToken()` đọc `source.charCodeAt(cursor)` rồi rẽ nhánh trực tiếp:

```
DEFAULT
 ├── whitespace      → skip
 ├── '/' '/'          → line comment
 ├── '/' '*'          → block comment
 ├── '`'              → scanTemplateLiteral
 ├── '/' (regex ctx)  → scanRegexLiteral
 ├── '"' | "'"        → scanString
 ├── digit | '.digit' → scanNumber
 ├── ident-start      → scanIdentifierOrKeyword
 └── otherwise        → scanOperator (longest-match trie)
```

Không có `String#split`, không có `regex.exec`, không có cấp phát chuỗi tạm trong hot path — chỉ index vào source qua `charCodeAt`.

### 2. Keyword trie

Tất cả keyword (EN + VI) build thành **một trie** keyed theo char-code, kể cả ký tự space cho keyword đa-từ như `khai báo`, `phá vòng lặp`, `kiểu của`, `khởi tạo cha`, `không xác định`.

Mỗi entry mang một quy tắc biên (boundary) để mô phỏng đúng hành vi regex cũ:

| Boundary | Ý nghĩa | Ví dụ keyword |
|---|---|---|
| `WORD` | Char tiếp theo không được là `[A-Za-z0-9_]` (giả lập JS `\b`) | `var`, `let`, `for`, `khai báo`, `nếu` |
| `IDENT` | Char tiếp theo không được là `[A-Za-zÀ-ỹ]` (cho keyword VI kết thúc bằng ký tự non-ASCII) | `riêng tư`, `bảo vệ`, `chờ`, `khi mà` |
| `NONE` | Không kiểm tra biên (giữ nguyên hành vi keyword cũ không có `\b`) | `else`, `return`, `try`, `as`, `from`, `const`, `async` |

Lookup là một vòng đơn:

```
1. Bắt đầu ở root, vị trí p = cursor.
2. Đọc charCodeAt(p), bước xuống child tương ứng.
3. Nếu node có .type và boundary qua → ghi nhận match dài nhất.
4. Lặp đến khi không còn child khớp.
5. Trả về match dài nhất (nếu có).
```

Độ phức tạp: O(L) với L = độ dài keyword dài nhất (hằng số). Không phụ thuộc số keyword.

### 3. Backtracking giới hạn cho identifier đa-từ

VietScript cho phép identifier đa-từ ngăn cách bằng space, ví dụ `con mèo đẹp = 1`. Tokenizer phải phân biệt:

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

Đây là backtracking **bounded** (peek tối đa độ dài keyword dài nhất, hằng số) — không phải full backtracking parser. So với cách cũ (`truncateBeforeEmbeddedKeyword` trong `tokenizer.ts:171` quét lại toàn bộ Specs cho từng từ con), đây là điểm hot path được hưởng lợi nhiều nhất theo bench `keywordHeavy`.

### 4. Operator longest-match trie

Tương tự keyword trie nhưng cho dấu toán tử. Đảm bảo `>>>=` thắng `>>>`, `>>>` thắng `>>=`, `>>` thắng `>` v.v. — không phụ thuộc thứ tự khai báo.

### 5. Template literal & regex literal

Hai phần này vốn đã được scan thủ công trong tokenizer cũ (`scanTemplateLiteral`, `scanRegexLiteral`). FSM port nguyên hành vi nhưng dùng `charCodeAt` thay vì regex inline để bỏ overhead.

### 6. Phân biệt regex literal vs phép chia

Giống tokenizer cũ: track `lastTokenType`. Nếu token trước đó nằm trong tập `REGEX_PRECEDING_TOKENS` (sau `=`, `(`, `,`, `return`, ...), `/` đầu = regex; ngược lại = chia.

## Kiểm chứng tương đương

3 lớp test bảo vệ hành vi:

1. **Unit parity** — `packages/parser/src/__test__/tokenizer-fsm.test.ts` chạy ~45 case đơn lẻ, mỗi case so sánh `tokenizeFSM(src)` với `tokenizeRegex(src)`.
2. **Fixture parity** — bench fixtures (tiny / medium / keywordHeavy / stringHeavy / large) đều phải tokenize không lỗi và token list khớp 1-1 với regex.
3. **Snapshot drift** — `bench-fixture-snapshot.test.ts` cố định output token (type|value|start-end) cho từng fixture. Nếu ai sửa tokenizer mà ra output khác → test fail.

## Bench

```bash
pnpm bench                    # chạy bench, in bảng so sánh
pnpm bench:baseline           # chạy bench, dump JSON vào packages/parser/bench/baseline.json
```

File bench:
- [`packages/parser/src/__bench__/tokenizer.bench.ts`](https://github.com/imrim12/vietscript/blob/main/packages/parser/src/__bench__/tokenizer.bench.ts) — so sánh regex vs fsm side-by-side.
- [`packages/parser/src/__bench__/parser.bench.ts`](https://github.com/imrim12/vietscript/blob/main/packages/parser/src/__bench__/parser.bench.ts) — bench end-to-end parse.
- [`packages/parser/src/__bench__/fixtures/`](https://github.com/imrim12/vietscript/blob/main/packages/parser/src/__bench__/fixtures) — 5 fixtures đại diện.

Khi thay đổi tokenizer, chạy bench trước/sau và commit cả 2 baseline JSON kèm PR.

## Khi nào dùng tokenizer regex cũ

Trong code thường: **không bao giờ**. FSM nhanh hơn vài trăm lần và khớp hành vi 1-1.

Khi cần debug:

```ts
import { Parser } from '@vietscript/parser'

// Dùng regex tokenizer cũ để khoanh vùng bug
const parser = new Parser({ tokenizer: 'regex' })
parser.parse(source)
```

Nếu hành vi khác giữa hai tokenizer trên cùng input → đó là bug parity, hãy mở issue kèm input tối thiểu.

## Thêm keyword mới

1. Thêm vào enum: [`packages/shared/parser/keyword.enum.ts`](https://github.com/imrim12/vietscript/blob/main/packages/shared/parser/keyword.enum.ts).
2. Thêm vào **cả hai** bảng:
   - Regex spec: `packages/parser/src/constants/specs.ts`.
   - FSM trie data: mảng `KEYWORDS` ở đầu `tokenizer-fsm.ts`. Chọn `boundary` đúng (`WORD` cho ASCII có `\b`, `IDENT` cho keyword VI kết thúc non-ASCII, `NONE` chỉ khi cố ý không kiểm tra biên).
3. Thêm test parity và 1 case dùng thật trong parser tests.
4. Chạy `pnpm test` (full suite) + `pnpm bench` (kiểm tra không regression).

Hai bảng phải đồng bộ — test parity sẽ fail ngay nếu lệch.

## Tài liệu liên quan

- [Roadmap](../roadmap.md) — phần Phase 0 ghi keyword EN + VI policy.
- [Compatibility matrix](../compatibility.md) — trạng thái cú pháp.
- Source: `packages/parser/src/tokenizer-fsm.ts`, `packages/parser/src/tokenizer.ts`, `packages/parser/src/parser.ts`.
