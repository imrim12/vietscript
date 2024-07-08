import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vietscript - Ngôn ngữ lập trình tiếng Việt",
  description: "Một ngôn ngữ lập trình mã nguồn mở hỗ trợ cú pháp tiếng Việt với dấu cách.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Bắt đầu",
        items: [
          { text: "Giới thiệu", link: "/introduction" },
          { text: "Bắt đầu ngay", link: "/getting-started" },
        ],
      },
      {
        text: "Hướng dẫn sử dụng",
        items: [
          { text: "Biến - Kiểu dữ liệu", link: "/basics/variables" },
          { text: "Toán tử", link: "/basics/operators" },
          { text: "Định nghĩa và thực thi hàm", link: "/basics/function" },
          { text: "Câu lệnh điều kiện", link: "/basics/if" },
          { text: "Câu lệnh lặp", link: "/basics/for" },
          { text: "Câu lệnh khi mà", link: "/basics/do-while" },
          { text: "Câu lệnh duyệt", link: "/basics/switch-case" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
