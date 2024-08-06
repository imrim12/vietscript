export type TestCase = {
  input: string;
  expectedOutput: string;
};

export type Result = TestCase & {
  result: string;
};
