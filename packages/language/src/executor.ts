import { Parser } from "./parser";

export class Executor extends Parser {
  /**
   * Initializes the parser.
   */
  constructor() {
    super();
  }

  public execute(syntax: string) {
    this.parse(syntax);

    return eval(this.tokenizer.executable);
  }
}
