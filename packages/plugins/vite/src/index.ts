import parser from "@vietscript/parser";

export default () => ({
  name: "vietscript-loader",
  transform(code: string, id: string) {
    if (id.endsWith(".vjs")) {
      let loadedFormModule = {};

      try {
        loadedFormModule = parser.parse(code);
      } catch (error) {
        console.error(error);
      }

      return `export default ${JSON.stringify(loadedFormModule)}`;
    }
  },
});
