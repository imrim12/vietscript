# Định nghĩa và thực thi hàm

Hàm VieLang là một khối mã được thiết kế để thực hiện một tác vụ cụ thể. Một hàm Vielang được thực thi khi gọi nó (call it)

## Cú pháp khai báo hàm

Hàm `Vielang` được xác định bằng từ khóa `hàm`, theo sau là tên, theo sau là dấu ngoặc đơn `()`.

Tên hàm có thể chứa các chữ cái tiếng việt có dấu cách (giống với tên biến)

Các dấu ngoặc đơn có thể bao gồm các tên tham số được phân tách bằng dấu phẩy: (tham số một, tham số hai, ...)

Mã được hàm thực thi được đặt bên trong dấu ngoặc nhọn: {}

```js
hàm tính tuổi(năm sinh) {
  // code to be executed

}
```

## Gọi hàm

Hàm sẽ được thực thi khi gọi hàm  bằng cú pháp `()`

```js
hàm tính tuổi(năm sinh) {
  // code to be executed

}

tính tuổi()
```

## Hàm trả về 

Sử dụng từ khoá `trả về` để trả về 1 giá trị của hàm

```js
hàm tính tuổi(năm sinh) {
  khai báo tuổi = 2024 - năm sinh
  trả về tuổi
}

```