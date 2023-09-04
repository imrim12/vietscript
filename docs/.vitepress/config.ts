import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vietscript - Ngôn ngữ lập trình tiếng Việt",
  description:
    "Một ngôn ngữ lập trình mã nguồn mở được viết hoàn toàn bằng TypeScript và hỗ trợ cú pháp tiếng Việt với dấu cách.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Specs", link: "/specs/es5" }],

    sidebar: [
      {
        text: "About ESTree",
        items: [{ text: "Governance", link: "/specs/docs/governance" }],
      },
      {
        text: "Specification",
        items: [
          { text: "Deprecated", link: "/specs/deprecated" },
          { text: "ES5", link: "/specs/es5" },
          { text: "ES2015", link: "/specs/es2015" },
          { text: "ES2016", link: "/specs/es2016" },
          { text: "ES2017", link: "/specs/es2017" },
          { text: "ES2018", link: "/specs/es2018" },
          { text: "ES2019", link: "/specs/es2019" },
          { text: "ES2020", link: "/specs/es2020" },
          { text: "ES2021", link: "/specs/es2021" },
          { text: "ES2022", link: "/specs/es2022" },
        ],
      },
      {
        text: "Experimental",
        link: "https://github.com/estree/estree/tree/master/experimental",
      },
      {
        text: "Extensions",
        link: "https://github.com/estree/estree/tree/master/extensions",
      },
      {
        text: "Stage 3",
        link: "https://github.com/estree/estree/tree/master/stage3",
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
