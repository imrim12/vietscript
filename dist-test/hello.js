const tên = "Thế giới";
console.log(`Xin chào, ${tên}!`);
function cộng(a, b = 0) {
  return a + b;
}
console.log("1 + 2 =", cộng(1, 2));
console.log("5 + 0 =", cộng(5));
const mảng = [1, 2, 3, 4, 5];
const tổng = mảng.reduce((acc, x) => acc + x, 0);
console.log("Tổng:", tổng);
//# sourceMappingURL=hello.js.map
