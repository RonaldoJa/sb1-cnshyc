import { Component, OnInit } from '@angular/core';
import { WordSearchService } from '../../services/word-search.service';
import { Cell, ProgrammingQuestion } from '../../models/word-search.model';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.component.html',
  styleUrls: ['./word-search.component.css']
})
export class WordSearchComponent implements OnInit {
  grid: Cell[][] = [];
  questions: ProgrammingQuestion[] = [];
  selectedCells: Cell[] = [];
  message: string = '';
  isSelecting: boolean = false;

  constructor(private wordSearchService: WordSearchService) {}

  ngOnInit() {
    this.grid = this.wordSearchService.generateGrid();
    this.questions = this.wordSearchService.getQuestions();
  }

  onMouseDown(cell: Cell) {
    this.isSelecting = true;
    this.selectedCells = [cell];
    cell.selected = true;
  }

  onMouseOver(cell: Cell) {
    if (this.isSelecting && !this.selectedCells.includes(cell)) {
      this.selectedCells.push(cell);
      cell.selected = true;
    }
  }

  onMouseUp() {
    this.isSelecting = false;
    const foundWord = this.wordSearchService.checkWord(this.selectedCells);
    
    if (foundWord) {
      this.message = `¡Encontraste la palabra ${foundWord}!`;
    } else {
      this.selectedCells.forEach(cell => cell.selected = false);
      this.message = 'Intenta de nuevo';
    }
    
    this.selectedCells = [];
    
    if (this.questions.every(q => q.found)) {
      this.message = '¡Felicitaciones! Has encontrado todas las palabras';
    }
  }

  showHint(question: ProgrammingQuestion) {
    this.message = question.hint;
  }
}