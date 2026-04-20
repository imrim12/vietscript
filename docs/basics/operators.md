# Toán tử

Giống hoàn toàn JavaScript. VietScript không thêm / bớt toán tử nào.

## Số học

| Toán tử | Ý nghĩa |
|---|---|
| `+` | Cộng |
| `-` | Trừ |
| `*` | Nhân |
| `/` | Chia |
| `%` | Chia lấy dư |
| `**` | Luỹ thừa |
| `++` | Tăng 1 đơn vị (prefix/postfix) |
| `--` | Giảm 1 đơn vị (prefix/postfix) |

```vietscript
biến x = 10
x++
x = 2 ** 8     // 256
```

## Gán (Assignment)

| Toán tử | Tương đương |
|---|---|
| `=` | gán |
| `+=` / `-=` / `*=` / `/=` / `%=` / `**=` | arithmetic assign |
| `&=` / `\|=` / `^=` | bitwise assign |
| `<<=` / `>>=` / `>>>=` | shift assign |
| `\|\|=` / `&&=` / `??=` | logical assign |

```vietscript
biến x = 10
x += 5         // 15
x ??= 0        // x bằng null/undefined thì gán 0
x \|\|= "mặc định"
```

## So sánh

| Toán tử | Ý nghĩa |
|---|---|
| `==` / `===` | bằng (loose/strict) |
| `!=` / `!==` | khác (loose/strict) |
| `<` / `>` / `<=` / `>=` | so sánh thứ tự |

## Logic

| Toán tử | Ý nghĩa |
|---|---|
| `&&` | và |
| `\|\|` | hoặc |
| `!` | phủ định |
| `??` | nullish coalescing |

```vietscript
hằng số tên = input ?? "mặc định"    // null/undefined → "mặc định"
hằng số ok = x && y
```

## Bitwise

| Toán tử | Ý nghĩa |
|---|---|
| `&` / `\|` / `^` | AND / OR / XOR |
| `~` | NOT |
| `<<` / `>>` / `>>>` | Shift left / right arithmetic / right logical |

## Ternary

```vietscript
hằng số nhóm = tuổi >= 18 ? "người lớn" : "trẻ em"
```

## Keyword-based operators

| Toán tử | VietScript |
|---|---|
| `typeof` | `kiểu của` |
| `instanceof` | `là kiểu` |
| `in` | `trong` |
| `delete` | `xoá` |
| `void` | `void` |
| `new` | `new` |

```vietscript
nếu (kiểu của x === "number") { ... }
nếu (con mèo là kiểu Động Vật) { ... }
nếu ("prop" trong đối tượng) { ... }
xoá đối tượng.prop
```

## Spread `...`

```vietscript
hằng số kết hợp = [...a, ...b]
hằng số trộn = { ...mặc định, ...tùy chỉnh }
f(...args)
```

## Optional chaining `?.`

```vietscript
hằng số tên = người?.thông tin?.tên
hằng số đầu tiên = mảng?.[0]
hằng số gọi = đối tượng?.phương thức?.()
```
