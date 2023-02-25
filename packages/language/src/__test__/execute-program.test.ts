import { executor } from "@lang";

describe("execute-program.test", () => {
  it("should execute the program normally", () => {
    const program = `khai báo tuổi = 18;`;

    executor.execute(program);
  });
});
