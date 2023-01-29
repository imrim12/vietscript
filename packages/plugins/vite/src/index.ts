import parser from "davascript";

export default () => ({
  name: "davascript-loader",
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
