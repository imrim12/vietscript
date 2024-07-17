# Câu lệnh duyệt điều kiện

Câu lệnh duyệt trong VieLang cho phép bạn kiểm tra giá trị của một biến và thực thi các khối mã khác nhau dựa trên giá trị đó. Đây là một công cụ mạnh mẽ để thay thế cho các câu lệnh nếu...khác phức tạp khi bạn cần kiểm tra nhiều giá trị khác nhau của cùng một biến.


## Cú pháp

```css
duyệt (biến) {
    trường hợp giá_trị_1: 
        // Khối mã sẽ được thực thi nếu biến có giá trị là giá_trị_1
    trường hợp giá_trị_2: 
        // Khối mã sẽ được thực thi nếu biến có giá trị là giá_trị_2
    ...
    mặc định: 
        // Khối mã sẽ được thực thi nếu biến không khớp với bất kỳ giá trị nào ở trên
}
```

### Ví dụ
Dưới đây là một ví dụ về cách sử dụng câu lệnh duyệt trong VieLang:


```css
duyệt (tuổi_tác) {
    trường hợp 20: 
        in ra ("bạn 20 tuổi");
    trường hợp 12: 
        in ra ("bạn 12 tuổi");
    mặc định: 
        in ra ("mặc định ở");
}

```


## Tổng kết
Câu lệnh duyệt trong VieLang là một công cụ mạnh mẽ để kiểm tra giá trị của một biến và thực thi các khối mã khác nhau dựa trên giá trị đó. Bằng cách sử dụng câu lệnh này, bạn có thể đơn giản hóa mã nguồn khi cần kiểm tra nhiều giá trị khác nhau của cùng một biến.