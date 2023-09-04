import { Position } from "@parser/node/types";
import { Parser } from "./parser";

export class Token {
  type: string;
  value: string;
  start: number;
  end: number;
  pos: Position;
  range: [number, number];

  constructor(type: string, value: string, start: number, end: number, pos: Position) {
    this.type = type;
    this.value = value;
    this.start = start;
    this.end = end;
    this.pos = pos;
    this.range = [start, end];
  }
}

export class Tokenizer {
  parser: Parser;

  chunkStart: number = 0; // cursor

  pos: Position = { column: 0, line: 0 };

  constructor(parser: Parser) {
    this.parser = parser;
  }

  readWord() {}
}
