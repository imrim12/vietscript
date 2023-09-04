import { parseProgram } from "@parser/program";
import { Tokenizer } from "./tokenizer";

export class Parser {
  code: string = "";

  tokenizer: Tokenizer;

  constructor() {}

  parse(code: string) {
    this.code = code;
    this.tokenizer = new Tokenizer(this);

    const program = parseProgram(this);

    return program;
  }
}
