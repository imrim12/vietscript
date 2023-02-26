import { executor } from "@lang";

describe("execute-program.test", () => {
  it("should execute the program normally", () => {
    const program = `khai báo tuổi = 18; console.log(tuổi)`;

    executor.execute(program);
  });
});
