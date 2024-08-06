import { CaretRightOutlined } from "@ant-design/icons";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Button, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { createDependencyProposals } from "src/editor/autocomplete";
import { languageExtensionPoint, languageID } from "src/editor/config";
import { monarchLanguage, richLanguageConfiguration } from "src/editor/vietscript";

function Dev() {
  const [program, setProgram] = useState("");
  const [result, setResult] = useState("");
  const monaco = useMonaco();

  function handleEditorChange(value: any) {
    setProgram(value);
  }

  const executeCode = () => {
    let capturedOutput = "";
    const originalConsoleLog = console.log;

    console.log = (output) => {
      capturedOutput += output;
    };

    try {
      // const _program = transpiler.compile(program)
      const _program = { target: program };
      eval(_program.target);
      setResult(capturedOutput);
    } catch (error) {
      setResult(`Lỗi: ${error}`);
    } finally {
      console.log = originalConsoleLog;
    }
  };

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
      <div className="flex z-30 items-center w-full justify-center mb-5">
        <Link to="/" className="block">
          <Button className="mr-4 ">Trở về</Button>
        </Link>
        <Button onClick={executeCode} shape="default">
          <CaretRightOutlined size={10} /> Thực thi
        </Button>
      </div>
      <Row className="pt-3">
        <Col span={16} className="px-8 h-screen ">
          <Card className="shadow">
            <Editor height="100vh" value={program} language="Vietscript" onChange={handleEditorChange} />
          </Card>
        </Col>
        <Col span={8}>
          <h2>Kết quả</h2>
          <div className="border min-h-32 w-full p-4 mt-1 rounded-md border-solid">
            <>{result ? JSON.parse(JSON.stringify(result)) : 'Nhấn nút "thực thi" để biên dịch code'}</>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default Dev;
