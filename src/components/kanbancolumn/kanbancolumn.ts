import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KanbanColumn } from '../../models/KanbanColumn.model';

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
  @Input() column: KanbanColumn;
  @Output() move: EventEmitter<any>;

  constructor() {
    console.log('Hello KanbancolumnComponent Component');
    this.move = new EventEmitter<any>();
  }

  log($event){
    this.move.emit(
      {column: this.column, card: $event.card,  shift: $event.shift}
    );
  }
}