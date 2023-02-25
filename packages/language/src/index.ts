import { Executor } from "./executor";
import { Parser } from "./parser";

const parser = new Parser();

const executor = new Executor();

export default parser;

export { executor };
export { Tokenizer } from "./tokenizer";
export { Parser } from "./parser";
