# Module (Import / Export)

## Import

```vietscript
// Side-effect import
sử dụng "./setup"

// Default import
sử dụng mặc định từ "./module"

// Named imports
sử dụng { a, b, c } từ "./module"

// Rename
sử dụng { a như là alias } từ "./module"

// Namespace
sử dụng * như là Mod từ "./module"

// Mix
sử dụng mặc định, { a, b } từ "./module"
```

| VietScript | JS |
|---|---|
| `sử dụng` | `import` |
| `từ` | `from` |
| `như là` | `as` |

## Export

```vietscript
// Named export
cho phép hằng số PI = 3.14
cho phép hàm cộng(a, b) { trả về a + b }
cho phép lớp Con Mèo {}

// Named export (listed)
hằng số x = 1
hằng số y = 2
cho phép { x, y }

// Default export
cho phép mặc định hàm {}
cho phép mặc định lớp App {}

// Re-export
cho phép * từ "./khác"
cho phép { a, b } từ "./khác"
```

| VietScript | JS |
|---|---|
| `cho phép` | `export` |
| `cho phép mặc định` | `export default` |

## Dynamic import

```vietscript
bất đồng bộ hàm chạy() {
  hằng số mod = chờ sử dụng("./có thể thay đổi")
  mod.mặc định()
}
```
