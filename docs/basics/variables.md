# Biến và kiểu dữ liệu

## 3 cách khai báo biến

| VietScript | JS |
|---|---|
| `khai báo x = 1` | `var x = 1` |
| `biến x = 1` | `let x = 1` |
| `hằng số x = 1` | `const x = 1` |

```vietscript
khai báo tuổi = 22        // var
biến số lần = 0           // let
hằng số PI = 3.14         // const
```

## Tên biến

Tên biến hỗ trợ chữ Latin, chữ Việt có dấu, và dấu cách giữa các từ:

```vietscript
hằng số tên = "Viên"
hằng số tuổi hiện tại = 22
hằng số Con Mèo Xinh = {}
```

Khi transpile sang JS, dấu cách sẽ được thay bằng `_`:

```
tuổi hiện tại   →   tuổi_hiện_tại
Con Mèo Xinh    →   Con_Mèo_Xinh
```

JS hỗ trợ Unicode identifier, nên tên biến tiếng Việt có dấu hoàn toàn hợp lệ.

## Không được dùng keyword làm tên biến

Các từ khóa tiếng Việt không thể dùng làm tên biến:

```vietscript
✗ khai báo lớp = 1      // `lớp` là keyword CLASS
✗ khai báo của = "a"    // `của` là keyword OF
✓ khai báo cái lớp = 1  // OK, "cái lớp" là identifier (không bắt đầu bằng keyword)
```

## Destructuring

```vietscript
hằng số { tên, tuổi } = người
hằng số [đầu, ...còn lại] = mảng
hằng số { a: đổi tên, b = 0, c: { d } } = phức tạp
```

## Kiểu dữ liệu nguyên thủy

| VietScript | JS |
|---|---|
| `đúng` / `sai` | `true` / `false` |
| `rỗng` | `null` |
| `không xác định` | `undefined` |
| `NaN` | `NaN` |
| `vô cực` | `Infinity` |
| Số (`42`, `3.14`, `0xff`, `1_000`, `10n`) | number / bigint |
| Chuỗi (`"..."`, `'...'`, `` `...` ``) | string |

### Số

```vietscript
hằng số nguyên = 42
hằng số thập phân = 3.14
hằng số khoa học = 1.5e10
hằng số hex = 0xff
hằng số octal = 0o17
hằng số binary = 0b1010
hằng số phân cách = 1_000_000
hằng số big = 12345n        // BigInt
```

### Chuỗi

```vietscript
hằng số đơn = 'hello'
hằng số kép = "world"
hằng số template = `Xin chào ${tên}!`
hằng số nhiều dòng = `dòng 1
dòng 2`
```

Template literal hỗ trợ interpolation `${biểu thức}` và nested backtick.

## Mảng & object

```vietscript
hằng số mảng = [1, 2, 3, ...khác]
hằng số đối tượng = {
  tên: "Tú",
  tuổi: 25,
  ...mặc định,
  [khóa động]: giá trị,
  phương thức() { trả về 1 },
  lấy prop() { trả về 2 },
  gán prop(v) {},
}
```

## Xem thêm

- [Toán tử](operators.md)
- [Hàm](function.md)
- [Điều khiển luồng](../compatibility.md#3-điều-kiện)
- [Destructuring đầy đủ](../compatibility.md#1-khai-báo-biến)
