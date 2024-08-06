import { ClockCircleOutlined } from "@ant-design/icons";
import { Button, Segmented, Tabs } from "antd";
import { useState } from "react";
import { Result } from "src/types";

interface Props {
  results: Result[];
  time?: number;
}

export default function TestResults({ results, time }: Props) {
  const [activeTab, setActiveTab] = useState("1");
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        {results.every((result) => String(result.result) === result.expectedOutput) ? (
          <p className="font-bold text-xl text-emerald-600">Thành công</p>
        ) : (
          <p className="font-bold text-xl text-red-500">Thất bại</p>
        )}
        <Button>
          <ClockCircleOutlined /> {time?.toFixed(2)} ms
        </Button>
      </div>
      {results && (
        <Segmented<string>
          options={results.map((result, i) => ({
            label: (
              <div className="flex items-center">
                <span
                  className={`w-2 h-2 ${
                    result.expectedOutput === String(result.result) ? "bg-emerald-400" : "bg-red-500"
                  } rounded-full mr-2`}
                ></span>
                <p className="text-gray-600">{`Kiểm thử ${i + 1}`}</p>
              </div>
            ),
            value: String(i + 1),
          }))}
          onChange={(value) => {
            setActiveTab(value);
          }}
        />
      )}
      {activeTab && (
        <div className="mt-4">
          <span>Đầu vào</span>
          <div className="border rounded-md bg-gray-100 p-4">
            <pre>{results[Number(activeTab) - 1]?.input}</pre>
          </div>
          <br />
          <span>Kết quả</span>
          <div
            className={`border font-bold rounded-md bg-gray-100 p-4 ${
              String(results[Number(activeTab) - 1]?.result) === results[Number(activeTab) - 1]?.expectedOutput
                ? "text-emerald-600"
                : "text-red-500"
            }`}
          >
            <pre>{results[Number(activeTab) - 1]?.result}</pre>
          </div>
          <br />
          <span>Kết quả mong muốn</span>
          <div className="border rounded-md bg-gray-100 p-4">
            <pre>{results[Number(activeTab) - 1]?.expectedOutput}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
