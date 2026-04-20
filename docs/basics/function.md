# Hàm

## Khai báo hàm

```vietscript
hàm tính tuổi(năm sinh) {
  trả về 2024 - năm sinh
}

hàm chào(tên = "bạn") {
  console.log(`Xin chào, ${tên}!`)
}
```

## Arrow function

```vietscript
hằng số cộng = (a, b) => a + b
hằng số bình phương = x => x * x
hằng số xử lý = (dữ liệu) => {
  trả về dữ liệu.lọc(x => x > 0)
}
```

## Rest & default parameters

```vietscript
hàm tổng(khởi đầu = 0, ...số) {
  trả về số.reduce((a, b) => a + b, khởi đầu)
}
```

## Destructuring parameters

```vietscript
hàm in người({ tên, tuổi = 18 }) {
  console.log(`${tên}, ${tuổi} tuổi`)
}

hàm đầu cuối([đầu, ...đuôi]) {
  trả về { đầu, đuôi }
}
```

## Async / await

```vietscript
bất đồng bộ hàm lấy dữ liệu(url) {
  hằng số phản hồi = chờ fetch(url)
  trả về chờ phản hồi.json()
}
```

## Generator

```vietscript
hàm* đếm(từ đầu = 0) {
  biến i = từ đầu
  khi mà (đúng) {
    nhường i++
  }
}
```

## Async generator

```vietscript
bất đồng bộ hàm* đọc từng dòng(file) {
  // ...
  nhường dòng
}
```

## Hàm dưới dạng giá trị

```vietscript
hằng số ops = {
  cộng: (a, b) => a + b,
  trừ: (a, b) => a - b,
}

console.log(ops.cộng(1, 2))   // 3
```

## Xem thêm

- [Destructuring](../compatibility.md#1-khai-báo-biến)
- [Class](../compatibility.md#5-lớp)
