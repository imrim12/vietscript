# Bắt đầu nhanh

## Cài đặt

```bash
npm install -g pnpm

git clone https://github.com/imrim12/vietscript.git
cd vietscript
pnpm install
pnpm -r build
```

## Chạy file `.vjs` đầu tiên

Tạo file `hello.vjs`:

```vietscript
hằng số tên = "Thế giới"
console.log(`Xin chào, ${tên}!`)
```

Chạy bằng CLI:

```bash
node packages/cli/bin/vietscript.mjs run hello.vjs
```

Output:

```
Xin chào, Thế giới!
```

## Các lệnh CLI

```bash
vietscript run <file.vjs>              # Chạy file .vjs
vietscript build <srcDir> [outDir]     # Build thư mục .vjs → JS (outDir mặc định: dist)
vietscript watch <srcDir> [outDir]     # Build + watch thay đổi
vietscript check <file.vjs>            # Parse không chạy, chỉ kiểm tra cú pháp
```

## Chạy với Node loader (không cần CLI)

```bash
node --import '@vietscript/cli/register' hello.vjs
```

Node sẽ tự động transpile file `.vjs` trước khi import.

## Chạy với Bun

```ts
// plugin-preload.ts
import plugin from '@vietscript/cli/bun-plugin'

Bun.plugin(plugin)

await import('./hello.vjs')
```

```bash
bun --preload ./plugin-preload.ts ./hello.vjs
```

## Vite / Webpack

### Vite

```ts
// vite.config.ts
import vietscript from '@vietscript/plugin-vite'

export default {
  plugins: [vietscript()],
}
```

Trong file code bạn: `import "./app.vjs"` bình thường.

### Webpack

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.vjs$/,
        loader: '@vietscript/plugin-webpack',
      },
    ],
  },
}
```

## Stdlib tiếng Việt

Gói `@vietscript/stdlib` cung cấp wrappers tiếng Việt cho JS globals:

```vietscript
sử dụng { ghi, tròn, ngẫu nhiên } từ "@vietscript/stdlib"

ghi("Xin chào!")
ghi("Pi =", tròn(3.14 * 100) / 100)
ghi("Số may mắn:", tròn(ngẫu nhiên(1, 100)))
```

Chi tiết tại [stdlib.md](stdlib.md).

## Phát triển parser

Dự án phát triển theo TDD. Mỗi cú pháp mới có 3 loại test: parser positive, parser negative, codegen snapshot.

```bash
pnpm test              # Chạy toàn bộ test
pnpm test:coverage     # Test + coverage report
pnpm build             # Build tất cả package
```

Hướng dẫn thêm parser node: [CONTRIBUTING.md](../CONTRIBUTING.md).
