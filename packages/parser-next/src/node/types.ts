export interface Position {
  line: number; // >= 1
  column: number; // >= 0
}

export interface SourceLocation {
  source: string | null;
  start: Position;
  end: Position;
}

export interface Node {
  type: string;
  loc: SourceLocation | null;
}
