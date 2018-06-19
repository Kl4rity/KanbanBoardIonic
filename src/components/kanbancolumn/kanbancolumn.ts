import { Component } from '@angular/core';

/**
 * Generated class for the KanbancolumnComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'kanbancolumn',
  templateUrl: 'kanbancolumn.html'
})
export class KanbancolumnComponent {

  text: string;

  constructor() {
    console.log('Hello KanbancolumnComponent Component');
    this.text = 'Hello World';
  }

}
