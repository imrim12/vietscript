import { Parser } from "@vietscript/parser";
import generateDefault from "@babel/generator";

const generate = (generateDefault as any).default ?? generateDefault;

export default () => ({
  name: "vietscript-loader",

  transform(code: string, id: string) {
    if (!id.endsWith(".vjs")) return null;

    const parser = new Parser();
    parser.filename = id;
    const ast = parser.parse(code);
    const result = generate(ast, {
      sourceMaps: true,
      sourceFileName: id,
    });

    return {
      code: result.code,
      map: result.map,
    };
  },
});
