import { Injectable } from '@angular/core';
import { ProgrammingQuestion, Cell } from '../models/word-search.model';

@Injectable({
  providedIn: 'root'
})
export class WordSearchService {
  private questions: ProgrammingQuestion[] = [
    {
      id: 1,
      question: "¿Qué tipo de variable usarías para almacenar un número entero?",
      answer: "NUMBER",
      hint: "Es el tipo más común para números sin decimales",
      found: false
    },
    {
      id: 2,
      question: "¿Qué tipo de variable usarías para almacenar texto?",
      answer: "STRING",
      hint: "Se usa para cadenas de caracteres",
      found: false
    },
    {
      id: 3,
      question: "¿Qué tipo de variable usarías para verdadero/falso?",
      answer: "BOOLEAN",
      hint: "Solo puede tener dos valores posibles",
      found: false
    }
  ];

  generateGrid(size: number = 10): Cell[][] {
    const words = this.questions.map(q => q.answer);
    const grid: Cell[][] = [];
    
    // Initialize empty grid
    for (let i = 0; i < size; i++) {
      grid[i] = [];
      for (let j = 0; j < size; j++) {
        grid[i][j] = {
          letter: '',
          selected: false,
          row: i,
          col: j
        };
      }
    }

    // Place words
    words.forEach(word => {
      const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      let placed = false;
      
      while (!placed) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        
        if (this.canPlaceWord(grid, word, row, col, direction, size)) {
          this.placeWord(grid, word, row, col, direction);
          placed = true;
        }
      }
    });

    // Fill remaining spaces
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (grid[i][j].letter === '') {
          grid[i][j].letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    return grid;
  }

  private canPlaceWord(grid: Cell[][], word: string, row: number, col: number, direction: string, size: number): boolean {
    if (direction === 'horizontal') {
      if (col + word.length > size) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row][col + i].letter !== '' && grid[row][col + i].letter !== word[i]) {
          return false;
        }
      }
    } else {
      if (row + word.length > size) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col].letter !== '' && grid[row + i][col].letter !== word[i]) {
          return false;
        }
      }
    }
    return true;
  }

  private placeWord(grid: Cell[][], word: string, row: number, col: number, direction: string): void {
    for (let i = 0; i < word.length; i++) {
      if (direction === 'horizontal') {
        grid[row][col + i].letter = word[i];
      } else {
        grid[row + i][col].letter = word[i];
      }
    }
  }

  getQuestions(): ProgrammingQuestion[] {
    return this.questions;
  }

  checkWord(selectedCells: Cell[]): string {
    const word = selectedCells.map(cell => cell.letter).join('');
    const question = this.questions.find(q => q.answer === word && !q.found);
    
    if (question) {
      question.found = true;
      return word;
    }
    return '';
  }
}