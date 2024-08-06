import { CheckOutlined, MacCommandOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Editor, useMonaco } from "@monaco-editor/react";
import { Button, Card, Col, Drawer, Row, Tag } from "antd";
import { sortBy } from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Results from "src/components/Results";
import { createDependencyProposals } from "src/editor/autocomplete";
import { languageExtensionPoint, languageID } from "src/editor/config";
import { monarchLanguage, richLanguageConfiguration } from "src/editor/vietscript";
import { supabase } from "src/utils/supabase";

export default function Home() {
  const [problems, setProblems] = useState<any[]>([]);
  const [program, setProgram] = useState<string | undefined>(undefined);
  const [selectedProblem, setSelectedProblem] = useState<any>();
  const [open, setOpen] = useState(false);
  const monaco = useMonaco();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const getProblems = async () => {
    const { data, error } = await supabase.from("problems").select("*");
    console.log(data);
    if (data) {
      setProblems(data);
      setSelectedProblem(data.find((problem) => problem.serial === 1));
    }
    if (error) toast(error.message, { type: "error" });
  };

  useEffect(() => {
    getProblems();
  }, []);

  useEffect(() => {
    setProgram(`hàm ${selectedProblem?.meta_data.functionName} ${selectedProblem?.meta_data.params}{ \n \n \n}`);
  }, [selectedProblem]);

  useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    monaco?.languages.register(languageExtensionPoint);
    monaco?.languages.onLanguage(languageID, () => {
      monaco?.languages.setMonarchTokensProvider(languageID, monarchLanguage);
      monaco?.languages.setLanguageConfiguration(languageID, richLanguageConfiguration);
    });

    monaco?.languages.registerCompletionItemProvider(languageID, {
      provideCompletionItems: function (model, position) {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        return {
          suggestions: createDependencyProposals(range, monaco),
        };
      },
    });

    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);

  return (
    <Card>
      <Row className="pt-3">
        <Col span={12}>
          <div className="bg-zinc-100 text-lg w-full px-12 py-4 h-full rounded-lg ">
            <>
              <Button onClick={showDrawer} className="mr-2 mb-5">
                <MenuUnfoldOutlined size={10} /> Bài tập
              </Button>

              <Link to="/dev-mode">
                <Button onClick={showDrawer} className="mr-2 mb-5">
                  <MacCommandOutlined size={10} /> Chế độ phát triển
                </Button>
              </Link>
              <h3>
                {selectedProblem?.serial}. {selectedProblem?.title}
              </h3>
              <div className="my-5">
                <Tag className="rounded-full capitalize cursor-pointer" color="blue">
                  {selectedProblem?.difficulty}
                </Tag>
                <Tag className="rounded-full capitalize cursor-pointer" color="green">
                  {selectedProblem?.tag}
                </Tag>
              </div>
              <p className="mt-12 text-lg">{selectedProblem?.meta_data?.description}</p>
              <div className="my-12">
                <p className="font-bold text-lg"> Đầu vào</p>
                <p className="border rounded-lg bg-gray-200 p-5 mt-2">{selectedProblem?.meta_data?.input}</p>
              </div>
              <div className="my-12">
                <p className="font-bold text-lg"> Đầu ra</p>
                <p className="border rounded-lg bg-gray-200 p-5 mt-2">{selectedProblem?.meta_data?.output}</p>
              </div>
            </>
          </div>
        </Col>
        <Col span={12} className="px-8 h-screen ">
          <Card>
            <Editor
              height="50vh"
              value={program}
              options={{
                scrollBeyondLastLine: false,
                fontSize: 16,
              }}
              language="Vietscript"
              onChange={(value?: string) => setProgram(value)}
            />
          </Card>

          <Card className="mt-2">
            <Results id={selectedProblem?.id} program={program} fnName={selectedProblem?.meta_data.functionName} />
          </Card>
        </Col>
      </Row>
      <Drawer title="Danh sách bài tập" placement="left" onClose={onClose} open={open}>
        {sortBy(problems, "serial").map((problem) => (
          <button
            key={problem.id}
            onClick={() => {
              setProgram("");
              setSelectedProblem(problem);
              onClose();
            }}
            className="block p-2 border-none w-full text-left bg-transparent outline-none my-8 hover:bg-gray-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <p>
                {problem.serial}. {problem.title}
              </p>
              {problem.isSubmitted && <CheckOutlined size={20} className="block font-bold text-emerald-500" />}
            </div>
          </button>
        ))}
      </Drawer>
    </Card>
  );
}
