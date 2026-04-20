# Câu lệnh điều kiện

## if / else / else-if

```vietscript
nếu (tuổi >= 18) {
  console.log("Đủ tuổi")
} không thì nếu (tuổi >= 16) {
  console.log("Sắp đủ tuổi")
} không thì {
  console.log("Chưa đủ tuổi")
}
```

| VietScript | JS |
|---|---|
| `nếu` | `if` |
| `không thì` | `else` |
| `không thì nếu` | `else if` |

## Ternary `?:`

```vietscript
hằng số nhóm = tuổi >= 18 ? "người lớn" : "trẻ em"
```

## switch / case / default

```vietscript
duyệt (loại) {
  trường hợp 1:
  trường hợp 2:
    console.log("Một hoặc hai")
    phá vòng lặp

  trường hợp 3:
    console.log("Ba")
    phá vòng lặp

  mặc định:
    console.log("Khác")
}
```

| VietScript | JS |
|---|---|
| `duyệt` | `switch` |
| `trường hợp` | `case` |
| `mặc định` | `default` |
| `phá vòng lặp` | `break` |

Fall-through (nhiều `case` liên tiếp không có `break`) giống JS.
