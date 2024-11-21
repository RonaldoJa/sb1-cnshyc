import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <h1>Sopa de Letras de Programación</h1>
      <app-word-search></app-word-search>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 2rem;
      text-align: center;
    }
    h1 {
      color: #333;
      margin-bottom: 2rem;
    }
  `]
})
export class AppComponent {}