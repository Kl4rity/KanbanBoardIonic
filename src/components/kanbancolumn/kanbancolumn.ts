import { Component, Input } from '@angular/core';
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

  constructor() {
    console.log('Hello KanbancolumnComponent Component');
  }

}


// Code for disabling event propagation.
// for(var card of document.getElementsByClassName('slide-zoom')){
// 	console.log(1);
// 	card.addEventListener('mousedown', function(event){event.stopPropagation(); console.log(event);});
// }