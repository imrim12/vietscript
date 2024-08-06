import { CaretRightOutlined } from "@ant-design/icons";
import { Button, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { supabase } from "src/utils/supabase";
import TestCases from "./TestCases";
import TestResults from "./TestResults";
import { formatFunctionName } from "src/utils";
import { RESULTS_TAB_KEY } from "src/constants";
import { Result, TestCase } from "src/types";
import { toast } from "react-toastify";
import parser from "@vietscript/parser";
import generate from "@babel/generator";

interface Props {
  id: string;
  program?: string;
  fnName: string;
}

export default function Results({ id, program, fnName }: Props) {
  const [testCases, setTestCases] = useState([{ input: "", expectedOutput: "" }]);
  const [time, setTime] = useState(0);
  const [activeTab, setActiveTab] = useState(RESULTS_TAB_KEY.TEST_CASES);
  const [results, setResults] = useState<Result[]>([]);

  const items: TabsProps["items"] = [
    {
      key: RESULTS_TAB_KEY.TEST_CASES,
      label: "Các trường hợp kiểm thử",
      children: <TestCases testCases={structuredClone(testCases)} />,
    },
    {
      key: RESULTS_TAB_KEY.TEST_RESULTS,
      label: "Kết quả",
      disabled: activeTab !== RESULTS_TAB_KEY.TEST_RESULTS,
      children: <TestResults time={time} results={results ?? []} />,
    },
  ];

  const getTestCases = async () => {
    if (!id) return;
    const { data, error } = await supabase.from("test_cases").select("*").eq("problem_id", id);

    if (error) toast.error(error.message);
    setTestCases(data?.[0].test_cases);
  };

  useEffect(() => {
    setActiveTab(RESULTS_TAB_KEY.TEST_CASES);
    getTestCases();
  }, [id]);

  const runTests = (testCases: TestCase[]) => {
    if (!program) return [];
    const results = testCases.map((testCase) => {
      let result;
      try {
        const ast = parser.parse(program);
        const codeGenerated = generate(ast);
        const func = new Function("input", codeGenerated.code + `\nreturn ${formatFunctionName(fnName)}(input);`);
        const output = func(JSON.parse(testCase.input));
        result = String(output);
      } catch (error) {
        result = `Error: ${error}`;
      }
      return { ...testCase, result };
    });
    setActiveTab(RESULTS_TAB_KEY.TEST_RESULTS);
    return results;
  };

  const handleRunCode = () => {
    const timeStart = performance.now();
    const results = runTests(testCases.slice(0, 4));
    setResults(results);
    const timeEnd = performance.now();
    setTime(timeEnd - timeStart);
  };

  return (
    <div>
      <Button type="default" disabled={!program} onClick={handleRunCode} shape="default">
        <CaretRightOutlined size={10} /> Chạy thử
      </Button>

      <Tabs defaultActiveKey={"1"} onChange={(key) => setActiveTab(key)} activeKey={String(activeTab)} items={items} />
    </div>
  );
}
