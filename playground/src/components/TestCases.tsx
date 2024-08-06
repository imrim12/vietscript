import { Tabs } from "antd";
import { TestCase } from "src/types";

interface Props {
  testCases: TestCase[];
}
const TestCases = ({ testCases }: Props) => {
  return (
    <div>
      {testCases && (
        <Tabs
          defaultActiveKey="1"
          style={{ marginBottom: 32 }}
          items={testCases.slice(0, 4).map((testCase, i) => {
            const id = String(i + 1);
            return {
              label: `Kiểm thử ${id}`,
              key: id,
              children: (
                <>
                  <span>Đầu vào</span>
                  <div className="border rounded-md bg-gray-200 p-4">
                    <pre>{testCase.input}</pre>
                  </div>
                  <br />
                  <span>Kết quả mong muốn</span>
                  <div className="border rounded-md bg-gray-200 p-4">
                    <pre>{testCase.expectedOutput}</pre>
                  </div>
                </>
              ),
            };
          })}
        />
      )}
    </div>
  );
};

export default TestCases;
