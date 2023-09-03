import { Parser } from "@parser/parser";
import { Keyword } from "@vietscript/shared";

export const isExpression = (parser: Parser): boolean => {
  switch (parser.lookahead?.type) {
    case Keyword.ASYNC:
    case Keyword.FUNCTION:
    case "[":
    case "{":
    case Keyword.NUMBER:
    case Keyword.STRING:
    case Keyword.BOOLEAN:
    case Keyword.NAN:
    case Keyword.NULL:
    case Keyword.UNDEFINED:
    case "++":
    case "--":
    case "delete":
    case "void":
    case "typeof":
    case "+":
    case "-":
    case "~":
    case "!":
    case Keyword.AWAIT:
    case Keyword.THIS:
    case Keyword.IDENTIFIER: {
      return true;
    }
    default: {
      return false;
    }
  }
};
