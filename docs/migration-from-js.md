# Chuyển từ JavaScript sang VietScript

VietScript giữ nguyên ngữ nghĩa JavaScript 100% — chỉ thay từ khóa tiếng Anh bằng tiếng Việt. Ngoài keyword, mọi cú pháp giống hệt.

## Bảng chuyển đổi keyword

| JavaScript | VietScript |
|---|---|
| `var` | `khai báo` |
| `let` | `biến` |
| `const` | `hằng số` |
| `function` | `hàm` |
| `return` | `trả về` |
| `if` / `else` | `nếu` / `không thì` |
| `for` | `lặp` |
| `while` | `khi mà` |
| `do` | `thực hiện` |
| `of` | `của` |
| `in` | `trong` |
| `break` | `phá vòng lặp` |
| `continue` | `tiếp tục` |
| `switch` / `case` / `default` | `duyệt` / `trường hợp` / `mặc định` |
| `try` / `catch` / `finally` / `throw` | `thử` / `bắt lỗi` / `cuối cùng` / `báo lỗi` |
| `class` / `extends` | `lớp` / `kế thừa` |
| `super` / `constructor` | `khởi tạo cha` / `khởi tạo` |
| `this` | `đây` |
| `new` | `new` (giữ) |
| `async` / `await` | `bất đồng bộ` / `chờ` |
| `yield` | `nhường` |
| `import` / `export` / `from` / `as` | `sử dụng` / `cho phép` / `từ` / `như là` |
| `true` / `false` | `đúng` / `sai` |
| `null` | `rỗng` |
| `undefined` | `không xác định` |
| `NaN` | `NaN` (giữ) |
| `Infinity` | `vô cực` |
| `typeof` | `kiểu của` |
| `instanceof` | `là kiểu` |
| `delete` | `xoá` |
| `void` | `void` (giữ) |
| `debugger` | `debugger` (giữ) |
| `get` / `set` | `lấy` / `gán` |
| `static` | `tĩnh` |
| `public` / `private` / `protected` | `công khai` / `riêng tư` / `bảo vệ` |

## Ví dụ chuyển đổi

### JavaScript

```js
class Animal {
  #soundCount = 0;

  constructor(name, type = "cat") {
    this.name = name;
    this.type = type;
  }

  makeSound() {
    this.#soundCount++;
    return `${this.name} (${this.type}): sound ${this.#soundCount}`;
  }

  get soundCount() {
    return this.#soundCount;
  }

  static create(name) {
    return new Animal(name);
  }
}

const cat = Animal.create("Mimi");
console.log(cat.makeSound());
console.log(cat.soundCount);

const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2);

for (const [i, val] of doubled.entries()) {
  console.log(i, val);
}

try {
  throw new Error("demo");
} catch (e) {
  console.error(e.message);
}

const config = { ...defaults, debug: true };
const { debug } = config;
const value = obj?.prop ?? "default";
```

### VietScript

```vietscript
lớp Động Vật {
  #số lần kêu = 0

  khởi tạo(tên, loại = "mèo") {
    đây.tên = tên
    đây.loại = loại
  }

  tạo tiếng() {
    đây.#số lần kêu++
    trả về `${đây.tên} (${đây.loại}): tiếng số ${đây.#số lần kêu}`
  }

  lấy số lần kêu() {
    trả về đây.#số lần kêu
  }

  tĩnh tạo(tên) {
    trả về new Động Vật(tên)
  }
}

hằng số mèo = Động Vật.tạo("Mimi")
console.log(mèo.tạo tiếng())
console.log(mèo.số lần kêu)

hằng số số = [1, 2, 3]
hằng số gấp đôi = số.map(x => x * 2)

lặp (hằng số [i, giá trị] của gấp đôi.entries()) {
  console.log(i, giá trị)
}

thử {
  báo lỗi new Error("demo")
} bắt lỗi (e) {
  console.error(e.message)
}

hằng số cấu hình = { ...mặc định, debug: đúng }
hằng số { debug } = cấu hình
hằng số giá trị = đối tượng?.prop ?? "default"
```

## Điểm khác biệt cần lưu ý

1. **Tên biến có thể chứa dấu cách**:
   - VietScript: `hằng số con mèo = ...`
   - Khi sang JS: `con_mèo`

2. **Keyword không thể làm tên biến**, kể cả ở giữa:
   - ✗ `hằng số cái của tôi = 1` (`của` là keyword OF)
   - ✓ `hằng số tôi sở hữu = 1`

3. **Identifier mangling**: dấu cách → `_`, Unicode giữ nguyên:
   - `xin chào` → `xin_chào`
   - `Con Mèo Vui` → `Con_Mèo_Vui`

4. **Dùng object JS gốc bình thường**: `console`, `Math`, `JSON`, `fetch`, `Array`, v.v. đều dùng như JS. Hoặc import từ `@vietscript/stdlib` nếu muốn API tiếng Việt.

## Chuyển đổi ngược (JS → VietScript)

Chưa có tool tự động. Post-v1 sẽ thêm.
