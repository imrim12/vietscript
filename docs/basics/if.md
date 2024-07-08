# Câu lệnh điều kiện

Câu lệnh điều kiện trong VieLang cho phép bạn thực thi mã dựa trên việc một điều kiện là đúng hay sai. Câu lệnh điều kiện chính được sử dụng trong VieLang là câu lệnh nếu.

## Cú pháp
Cú pháp cho câu lệnh nếu như sau:

```js
nếu (điều_kiện) {
    // Khối mã sẽ được thực thi nếu điều kiện đúng
}
```

**Ví dụ**
Dưới đây là một ví dụ về cách sử dụng câu lệnh nếu trong VieLang:

```js

nếu (a > 2) {
    // Thực hiện hành động khi a lớn hơn 2
}
```
Trong ví dụ trên, nếu giá trị của a lớn hơn 2, khối mã trong dấu ngoặc nhọn {} sẽ được thực thi.


## Giải thích
`nếu`: Từ khóa bắt đầu một câu lệnh điều kiện.
(điều_kiện): Một biểu thức được kiểm tra. Nếu biểu thức này đánh giá là đúng, khối mã bên trong sẽ được thực thi.
{}: Dấu ngoặc nhọn bao quanh khối mã sẽ được thực thi nếu điều kiện là đúng.
## Câu lệnh nếu kết hợp với "ngược lại"
Bạn có thể kết hợp câu lệnh nếu với câu lệnh khác để xử lý trường hợp khi điều kiện không đúng.

Cú pháp

```js
nếu (a>2){
  // Thực thi code khi a lớn hơn 2
} ngược lại {
  // Thực thi các trường hợp khác
}

```

## Câu lệnh nếu lồng nhau
Bạn cũng có thể sử dụng các câu lệnh nếu lồng nhau để kiểm tra nhiều điều kiện.

Ví dụ:
```js
nếu (a > 2) {
    nếu (b > 5) {
        // Thực hiện hành động khi a lớn hơn 2 và b lớn hơn 5
    }
}

```