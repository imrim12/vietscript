import { Parser } from "./parser";

export class Executor extends Parser {
  /**
   * Initializes the parser.
   */
  constructor() {
    super();

    Error.prepareStackTrace = (_, stack) =>
      stack.map((callsite) => ({
        line: callsite.getLineNumber(),
        column: callsite.getColumnNumber(),
        fileName: callsite.getFileName(),
        functionName: callsite.getFunctionName(),
        methodName: callsite.getMethodName(),
        typeName: callsite.getTypeName(),
        isToplevel: callsite.isToplevel(),
        isEval: callsite.isEval(),
        isNative: callsite.isNative(),
        isConstructor: callsite.isConstructor(),
        evalOrigin: callsite.getEvalOrigin(),
        this: callsite.getThis(),
      }));
  }

  public execute(syntax: string) {
    this.parse(syntax);

    try {
      return eval(this.tokenizer.executable);
    } catch (error: any) {
      console.error(error);
    }
  }
}
