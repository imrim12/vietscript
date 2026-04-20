# Vòng lặp

## for truyền thống

```vietscript
lặp (biến i = 0; i < 10; i++) {
  console.log(i)
}
```

## for ... of

```vietscript
hằng số mảng = [1, 2, 3]
lặp (biến x của mảng) {
  console.log(x)
}
```

## for ... in

```vietscript
hằng số đối tượng = { a: 1, b: 2 }
lặp (biến khóa trong đối tượng) {
  console.log(khóa, đối tượng[khóa])
}
```

## for await ... of

```vietscript
bất đồng bộ hàm chạy() {
  lặp chờ (biến x của luồng bất đồng bộ) {
    console.log(x)
  }
}
```

## while

```vietscript
biến i = 0
khi mà (i < 5) {
  console.log(i)
  i++
}
```

## do ... while

```vietscript
biến i = 0
thực hiện {
  console.log(i)
  i++
} khi mà (i < 5)
```

## break / continue

```vietscript
lặp (biến i của mảng) {
  nếu (i === 0) tiếp tục       // skip
  nếu (i > 100) phá vòng lặp   // exit
  console.log(i)
}
```

## Labeled break / continue

```vietscript
ngoài: lặp (biến i = 0; i < 10; i++) {
  lặp (biến j = 0; j < 10; j++) {
    nếu (i * j > 20) phá vòng lặp ngoài
  }
}
```

## Destructuring trong for...of

```vietscript
hằng số cặp = [[1, "a"], [2, "b"]]
lặp (hằng số [số, chữ] của cặp) {
  console.log(số, chữ)
}
```

## Tham chiếu

| VietScript | JS |
|---|---|
| `lặp` | `for` |
| `khi mà` | `while` |
| `thực hiện` | `do` |
| `của` | `of` |
| `trong` | `in` |
| `chờ` | `await` |
| `phá vòng lặp` | `break` |
| `tiếp tục` | `continue` |
