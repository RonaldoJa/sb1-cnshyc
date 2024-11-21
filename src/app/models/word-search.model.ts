export interface ProgrammingQuestion {
  id: number;
  question: string;
  answer: string;
  hint: string;
  found: boolean;
}

export interface Cell {
  letter: string;
  selected: boolean;
  row: number;
  col: number;
}