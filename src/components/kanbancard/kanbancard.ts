import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KanbanCard } from '../../models/KanbanCard.model';

/**
 * Generated class for the KanbancardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'kanbancard',
  templateUrl: 'kanbancard.html'
})
export class KanbancardComponent {

  @Input() card: KanbanCard;
  @Output() move : EventEmitter<any>;

  constructor() {
    this.move = new EventEmitter<any>();
  }

  onForwardClicked(){
    this.move.emit({card: this.card, shift: 1});
  }

  onBackwardClicked(){
    this.move.emit({card: this.card, shift: -1});
  }
}
