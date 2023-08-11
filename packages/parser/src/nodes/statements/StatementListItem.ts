import { Parser } from "@lang/parser";

import { Declaration } from "../declarations/Declaration";

import { Statement } from "./Statement";

export class StatementListItem {
  [key: string]: any;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type) {
      case "Var":
      case "Let":
      case "Const":
      case "Async":
      case "Function":
      case "Class": {
        Object.assign(this, new Declaration(parser));
        break;
      }
      case "If":
      case "Do":
      case "While":
      case "For":
      case "Switch":
      case "Continue":
      case "Break":
      case "Return":
      case "With":
      case "Identifier":
      case "Throw":
      case "Try":
      case "Debugger": {
        Object.assign(this, new Statement(parser));
        break;
      }
    }
  }
}
