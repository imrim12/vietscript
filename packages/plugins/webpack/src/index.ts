import { Parser } from "@vietscript/parser";
import generateDefault from "@babel/generator";

const generate = (generateDefault as any).default ?? generateDefault;

export default function vietScriptLoader(this: any, source: string) {
  const filename = this?.resourcePath as string | undefined;
  const parser = new Parser();
  parser.filename = filename;
  const ast = parser.parse(source);
  const result = generate(ast, {
    sourceMaps: true,
    sourceFileName: filename,
  });

  if (this?.callback) {
    this.callback(null, result.code, result.map);
    return;
  }

  return result.code;
}
