import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KanbanColumn } from '../../models/KanbanColumn.model';
import { KanbanCard } from '../../models/KanbanCard.model';
import { ModalController } from 'ionic-angular';
import { EditCardPage } from '../../pages/edit-card/edit-card';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata.provider';

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

  constructor(public modalCtrl: ModalController, public boardsprovider: BoardsdataProvider) {
    this.move = new EventEmitter<any>();
  }

  log($event) {
    this.move.emit(
      { column: this.column, card: $event.card, shift: $event.shift }
    );
  }

  onCardPress(card: KanbanCard) {
    const modal = this.modalCtrl.create(EditCardPage, { currentCard: card, currentBoard: this.board, column: this.board.columns.indexOf(this.column) });
    modal.present();
  }

  reorderItems(indexes) {
    
    // For SOME reason, this interface changed and caused weird behaviour with 'undefined' values in the arrays left behind by array.splice() not being cleaned up
    // as well as the indexes passed in by the reorder function being
    // a) Flipped / UPDATE: No longer! 
    // b) Being positions, not indexes!
    
    let correctIndexes = {
      from : indexes.from -1,
      to : indexes.to -1
    }

    function reorderArray(array, indexes) {
      var element = array[indexes.from];
      array.splice(indexes.from, 1);
      array = array.filter(value => value != 'undefined');
      array.splice(indexes.to, 0, element);
      return array;
    }

    this.boardsprovider.boards[this.boardsprovider.boards.indexOf(this.board)].columns[this.board.columns.indexOf(this.column)].cards = reorderArray(this.column.cards, correctIndexes);
    this.boardsprovider.writeToDataBase();
  }
}