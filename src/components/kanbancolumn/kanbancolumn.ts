import { Component, Input } from '@angular/core';

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
  @Input() column: Object;

  constructor() {

  }

}
