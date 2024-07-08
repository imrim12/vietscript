# Bắt đầu ngay

## Sử dụng trình duyệt của VietScript
Playground của VietScript là một môi trường trực tuyến nơi bạn có thể viết, thử nghiệm và chạy mã VietScript trực tiếp trên trình duyệt mà không cần cài đặt thêm bất kỳ phần mềm nào.


## Cài đặt và thử nghiệm
VietScript được phát triển theo phương pháp TDD (Test Driven Development), các trường hợp sử dụng trong ngôn ngữ được viết thành các test case và được đặt trong các thư mục `__test__`. Để chạy các test case, bạn cần cài đặt NodeJS và PNPM, sau đó các chạy lệnh sau:

```bash
# Cài đặt PNPM
npm install -g pnpm

# Cài đặt các thư viện
pnpm install

# Chạy unit test
pnpm test
```