const ES5 = [
  ["break", "phá vòng lặp"],
  ["case", ""],
  ["catch", ""],
  ["continue", "tiếp tục"],
  ["debugger", "debugger"],
  ["default", "mặc định"],
  ["do", ""],
  ["else", "hoặc là"],
  ["finally", ""],
  ["for", ""],
  ["function", "hàm"],
  ["if", "nếu"],
  ["return", "trả về"],
  ["switch", ""],
  ["throw", "báo lỗi"],
  ["try", "thử"],
  ["var", "khai báo"],
  ["while", "khi mà"],
  ["with", ""],
  ["null", ""],
  ["true", "đúng"],
  ["false", "sai"],
  ["instanceof", ""],
  ["typeof", ""],
  ["void", ""],
  ["delete", "xoá"],
  ["new", "tạo mới"],
  ["in", "trong"],
  ["this", ""],
];

const ES5_MODULE = [...ES5, ["import", "cho phép"], ["export", "sử dụng"], ["from", "từ"], ["as", ""]];

const ES6 = [
  ...ES5_MODULE,
  ["super", "lớp cha"],
  ["class", "lớp"],
  ["extends", "kế thừa"],
  ["const", "hằng số"],
  ["let", "khai báo tạm"],
  ["static", "hàm tĩnh"],
  ["yield", ""],
  ["async", "bất đồng bộ"],
  ["await", "chờ"],
];

const FUTURE_RESERVED_WORDS = [
  ["enum", ""],
  ["implements", ""],
  ["interface", ""],
  ["package", ""],
  ["private", ""],
  ["protected", ""],
  ["public", ""],
  ["abstract", ""],
  ["boolean", ""],
  ["byte", ""],
  ["char", ""],
  ["double", ""],
  ["final", ""],
  ["float", ""],
];

export const JAVASCRIPT_PRESERVE_KEYWORDS = new Set(ES6.concat(FUTURE_RESERVED_WORDS).flat());

type OtomatNode = { [key: string]: OtomatNode | null };
// Create a otomat tree from keywords by its first character
// Example:
// Input: ["if", "else", "class", "const"]
// Output:
// {
//   i: {
//     f: null,
//   },
//   e: {
//     l: {
//       s: {
//         e: null,
//       },
//     },
//   },
//   c: {
//     l: {
//       a: {
//         s: {
//           s: null,
//         },
//       },
//     },
//     o: {
//       n: {
//         s: {
//           t: null,
//         },
//       },
//     },
//   },
// };
function createOtomatTree(keywords: string[]) {
  const tree: OtomatNode = {};

  for (const keyword of keywords) {
    let node = tree;
    for (const char of keyword) {
      if (!node[char]) {
        node[char] = {};
      }
      node = node[char]!;
    }
    node["\0"] = null;
  }

  return tree;
}
