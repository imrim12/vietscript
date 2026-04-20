# Đóng góp cho VietScript

Cảm ơn bạn quan tâm đến dự án! Tài liệu này hướng dẫn cách đóng góp code, đặc biệt là thêm cú pháp mới vào parser.

Tham khảo [Code of Conduct](CODE_OF_CONDUCT.md) và [Roadmap](docs/roadmap.md).

## Thiết lập môi trường

```bash
pnpm install
pnpm test          # chạy test
pnpm test:coverage # chạy test kèm coverage report
pnpm lint          # lint với eslint
pnpm build         # build tất cả package
```

## Kiến trúc tổng quan

```
Source .vjs  →  Tokenizer  →  Parser  →  Babel AST  →  @babel/generator  →  JavaScript
```

- `packages/parser/src/tokenizer.ts` — chia source thành token dựa trên `constants/specs.ts`.
- `packages/parser/src/parser.ts` — điều phối, delegate cho từng node class.
- `packages/parser/src/nodes/**` — mỗi AST node một file class, tự đọc token và build AST.
- Codegen dùng `@babel/generator` lib — không tự viết printer.

## Quy trình thêm cú pháp mới

### 1. Thêm keyword (nếu cần)

Nếu cú pháp cần keyword mới:

1. Thêm hằng vào `packages/shared/parser/keyword.enum.ts`.
2. Thêm regex tokenize vào `packages/parser/src/constants/specs.ts`. **Lưu ý Unicode:**
   - Nếu từ tiếng Việt **kết thúc bằng chữ ASCII** (a-z), dùng `\b` cuối: `/^\b(english|ti\u1EBFng vi\u1EC7t_)\b/`.
   - Nếu **kết thúc bằng chữ Unicode tiếng Việt** (ư, ệ, ộ...), dùng negative lookahead: `/^(english\b|ti\u1EBFng vi\u1EC7t(?![A-Za-z\u00C0-\u1EF9]))/`.
   - Nếu **bắt đầu bằng chữ Unicode** (đ, â...), bỏ `\b` đầu — chỉ giữ `^` anchor.
3. Thêm test tokenize vào `packages/parser/src/__test__/vietnamese-keywords.test.ts`.

### 2. Tạo node class

Mỗi AST node là 1 file trong `packages/parser/src/nodes/<category>/<NodeName>.ts`. Template:

```ts
import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

export class MyStatement {
  type = "MyStatement";

  // field khai báo theo chuẩn Babel AST
  foo: SomeNode;

  constructor(parser: Parser) {
    parser.eat(Keyword.MY_KEYWORD);
    parser.eat("(");
    this.foo = new SomeNode(parser);
    parser.eat(")");
  }
}
```

Nguyên tắc:
- **Shape phải khớp Babel AST** — nếu không `@babel/generator` sẽ sinh sai. Tra cứu [babel AST spec](https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md).
- Dùng `parser.eat(tokenType)` để consume token kỳ vọng, throw nếu không khớp.
- Không tự log hoặc thêm comment giải thích những gì code đã rõ — chỉ comment nếu có invariant ẩn.

### 3. Wire vào chỗ cần gọi

Edit file cha (ví dụ `Statement.ts` nếu là statement mới) để dispatch sang node mới dựa vào `parser.lookahead.type`.

### 4. Viết test (**bắt buộc 3 nhóm**)

Mỗi feature mới phải có đủ 3 loại test trước khi merge:

**a) Parser positive** — parse đúng, AST đúng shape.

```ts
// packages/parser/src/nodes/.../__test__/my-statement.test.ts
import { MyStatement } from "@parser/nodes/.../MyStatement";
import parser from "../../../setup-test";
import toPlainObject from "../../../toPlainObject";

describe("my-statement.test", () => {
  it("should parse normally", () => {
    const result = parser.parse(`từ khoá của tôi (x)`, MyStatement);
    expect(toPlainObject(result)).toStrictEqual({
      type: "MyStatement",
      foo: { /* expected shape */ },
    });
  });
});
```

**b) Parser negative** — cú pháp sai throw error rõ ràng.

```ts
it("should throw on missing paren", () => {
  expect(() => parser.parse(`từ khoá của tôi`, MyStatement))
    .toThrowError(/expected/i);
});
```

**c) Codegen** — AST sinh ra JS string chuẩn, dùng snapshot.

```ts
// packages/parser/src/nodes/.../__test__/generator/generator-my-statement.test.ts
import generate from "@babel/generator";
import { MyStatement } from "@parser/nodes/.../MyStatement";
import parser from "../../../../setup-test";

describe("generator-my-statement.test", () => {
  it("should generate javascript", () => {
    const ast = parser.parse(`từ khoá của tôi (x)`, MyStatement);
    const result = generate(ast);
    expect(result.code).toMatchSnapshot();
  });
});
```

### 5. Cập nhật compatibility matrix

Mở [docs/compatibility.md](docs/compatibility.md), tìm dòng feature tương ứng, đổi ❌ → 🟡 → ✅ theo trạng thái thực tế của PR.

### 6. Cập nhật docs

Nếu cú pháp cần hướng dẫn sử dụng, thêm/cập nhật trang tương ứng trong `docs/`.

## Quy ước code

- **Không thêm comment kể lể** "thêm cho task X", "PR #123", "lấy cảm hứng từ Y". Code nên tự giải thích qua tên biến.
- **Comment chỉ khi có lý do ẩn**: workaround bug cụ thể, invariant không nhìn thấy trong code.
- **Không thêm error handling cho scenario không thể xảy ra** — tin internal API, chỉ validate boundary.
- **Ưu tiên sửa file có sẵn** hơn tạo file mới.
- **Chạy `pnpm lint` trước khi commit**.

## Quy trình PR

1. Fork, tạo branch từ `main`: `git checkout -b feat/arrow-function`.
2. Commit theo [conventional commits](https://www.conventionalcommits.org/): `feat(parser): add arrow function`, `fix(tokenizer): ...`, `docs: ...`, `test: ...`.
3. PR phải pass CI (lint + test + coverage + build).
4. Mỗi feature trong compatibility matrix = 1 PR riêng. Không bó nhiều feature trong 1 PR.
5. Cập nhật [compatibility.md](docs/compatibility.md) trong cùng PR.

## Thắc mắc

Mở issue tại https://github.com/imrim12/vietscript/issues với label `question`.
