# Stdlib

`@vietscript/stdlib` cung cấp một tập wrappers tiếng Việt cho JavaScript globals. Mục tiêu: viết code 100% tiếng Việt mà không cần nhắc đến `console`, `Math`, `JSON`, `fetch`, v.v.

## Sử dụng

```vietscript
sử dụng { ghi, tròn, ngẫu nhiên } từ "@vietscript/stdlib"

ghi("Xin chào!")
```

## API

### Console I/O

| Hàm | Tương đương JS |
|---|---|
| `ghi(...args)` | `console.log(...args)` |
| `ghi lỗi(...args)` | `console.error(...args)` |
| `ghi cảnh báo(...args)` | `console.warn(...args)` |

### Ép kiểu

| Hàm | Tương đương JS |
|---|---|
| `tự số(x)` | `Number(x)` |
| `tự chuỗi(x)` | `String(x)` |
| `tự bool(x)` | `Boolean(x)` |
| `kiểu(x)` | `typeof x` |
| `độ dài(x)` | `x.length` |

### Math

| Hàm | Tương đương JS |
|---|---|
| `tròn(x)` | `Math.round(x)` |
| `làm tròn xuống(x)` | `Math.floor(x)` |
| `làm tròn lên(x)` | `Math.ceil(x)` |
| `giá trị tuyệt đối(x)` | `Math.abs(x)` |
| `nhỏ nhất(...values)` | `Math.min(...values)` |
| `lớn nhất(...values)` | `Math.max(...values)` |
| `ngẫu nhiên(min = 0, max = 1)` | `Math.random() * (max - min) + min` |

### Async

| Hàm | Tương đương JS |
|---|---|
| `đợi(ms)` | `new Promise(r => setTimeout(r, ms))` |

### JSON

| Hàm | Tương đương JS |
|---|---|
| `phân tích JSON(text)` | `JSON.parse(text)` |
| `JSON sang chuỗi(value, space?)` | `JSON.stringify(value, null, space)` |

### Fetch

| Hàm | Tương đương JS |
|---|---|
| `tải văn bản(url)` | `fetch(url).then(r => r.text())` |
| `tải JSON(url)` | `fetch(url).then(r => r.json())` |

## Ví dụ

```vietscript
sử dụng { ghi, tải JSON, ngẫu nhiên, tròn } từ "@vietscript/stdlib"

bất đồng bộ hàm chạy() {
  hằng số dữ liệu = chờ tải JSON("https://api.example.com/data")
  ghi("Số bản ghi:", dữ liệu.length)

  hằng số chỉ số = tròn(ngẫu nhiên(0, dữ liệu.length))
  ghi("Mẫu ngẫu nhiên:", dữ liệu[chỉ số])
}

chạy()
```

## Lưu ý về đặt tên

Vì VietScript identifier tách bằng dấu cách (không phải gạch dưới), khi `sử dụng` stdlib, viết tên hàm với dấu cách:

```vietscript
✓ sử dụng { ghi lỗi } từ "@vietscript/stdlib"
✗ sử dụng { ghi_lỗi } từ "@vietscript/stdlib"
```

Parser tự động chuyển `ghi lỗi` → `ghi_lỗi` khi output JS, khớp với tên export thực của stdlib.
