import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KanbanColumn } from '../../models/KanbanColumn.model';
import { KanbanCard } from '../../models/KanbanCard.model';
import { ModalController } from 'ionic-angular';
import { EditCardPage } from '../../pages/edit-card/edit-card';
import { KanbanBoard } from '../../models/KanbanBoard.model';

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
  @Input() board: KanbanBoard;
  @Output() move: EventEmitter<any>;

  constructor(public modalCtrl: ModalController) {
    console.log('Hello KanbancolumnComponent Component');
    this.move = new EventEmitter<any>();
  }

  log($event){
    this.move.emit(
      {column: this.column, card: $event.card,  shift: $event.shift}
    );
  }

  onCardPress(card: KanbanCard){
    const modal = this.modalCtrl.create(EditCardPage ,{currentCard: card, currentBoard: this.board, column: this.board.columns.indexOf(this.column)});
    modal.present();
  }
}