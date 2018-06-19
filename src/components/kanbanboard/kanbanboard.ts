import { Component } from '@angular/core';

/**
 * Generated class for the KanbanboardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'kanbanboard',
  templateUrl: 'kanbanboard.html'
})
export class KanbanboardComponent {

  text: string;

  constructor() {
    console.log('Hello KanbanboardComponent Component');
    this.text = 'Hello World';
  }

}
