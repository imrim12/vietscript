import { Parser } from "./parser";

const parser = new Parser();

export default parser;

export { Tokenizer } from "./tokenizer";
export { Parser } from "./parser";
export { VietScriptError } from "./errors";

if (typeof window !== "undefined") {
  (window as unknown as { VietScript: { parser: Parser } }).VietScript = { parser };
}
