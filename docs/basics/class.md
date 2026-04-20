# Lớp (Class)

## Khai báo class

```vietscript
lớp Con Mèo {
  số chân = 4
  tên: string

  khởi tạo(tên) {
    đây.tên = tên
  }

  kêu() {
    trả về `${đây.tên} meo!`
  }
}
```

| VietScript | JS |
|---|---|
| `lớp` | `class` |
| `khởi tạo` | `constructor` |
| `đây` | `this` |
| `kế thừa` | `extends` |
| `khởi tạo cha` | `super` |

## Kế thừa

```vietscript
lớp Động Vật {
  khởi tạo(loại) { đây.loại = loại }
}

lớp Con Mèo kế thừa Động Vật {
  khởi tạo(tên) {
    khởi tạo cha("mèo")
    đây.tên = tên
  }

  mô tả() {
    trả về `${đây.loại}: ${đây.tên}`
  }
}

// Syntax khác cho kế thừa:
lớp Con Chó (Động Vật) {
  // ...
}
```

## Static method / property

```vietscript
lớp Math Helper {
  tĩnh PI = 3.14159

  tĩnh bình phương(x) {
    trả về x * x
  }
}

console.log(Math Helper.PI)
console.log(Math Helper.bình phương(5))
```

## Getter / setter

```vietscript
lớp Hình Tròn {
  khởi tạo(bán kính) {
    đây._bk = bán kính
  }

  lấy diện tích() {
    trả về Math.PI * đây._bk ** 2
  }

  gán bán kính(giá trị) {
    đây._bk = giá trị
  }
}
```

## Access modifier

```vietscript
lớp Tài Khoản {
  công khai tên: string
  riêng tư số dư: number
  bảo vệ ghi log: hàm

  khởi tạo(tên, sốDư) {
    đây.tên = tên
    đây.số dư = sốDư
  }
}
```

**Lưu ý:** TypeScript semantics. Ở runtime JS, `riêng tư` không thực sự private — dùng `#field` cho real private.

## Private field `#`

```vietscript
lớp Đếm {
  #số lượng = 0

  tăng() {
    đây.#số lượng++
  }

  lấy giá trị() {
    trả về đây.#số lượng
  }
}
```

## Generator method

```vietscript
lớp Iter {
  *từ đầu đến cuối(từ, đến) {
    lặp (biến i = từ; i <= đến; i++) {
      nhường i
    }
  }
}

hằng số iter = new Iter()
lặp (biến x của iter.từ đầu đến cuối(1, 3)) {
  console.log(x)    // 1, 2, 3
}
```

## Async method

```vietscript
lớp Dịch Vụ {
  bất đồng bộ lấy dữ liệu(url) {
    hằng số res = chờ fetch(url)
    trả về chờ res.json()
  }
}
```
