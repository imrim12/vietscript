import { executor } from "@lang";

describe("execute-program.test", () => {
  it("should execute the program normally", () => {
    const program = `khai báo tuổi = 18; console.log(tuổi); tuổi;`;

    expect(executor.execute(program)).toBe(18);
  });

  it("should throw error with the correct caret position", () => {
    const program = `
    console.log(18);
    console.log(tuổi); tuổi;`;

    executor.execute(program);

    // expect(() => {
    //   executor.execute(program);
    // }).toThrowError();
  });
});
