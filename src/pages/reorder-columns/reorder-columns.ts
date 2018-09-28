import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray, ModalController } from 'ionic-angular';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata.provider';
import { KanbanColumn } from '../../models/KanbanColumn.model';
import { EditColumnPage } from '../edit-column/edit-column';
import { AddcolumnPage } from '../addcolumn/addcolumn';

/**
 * Generated class for the ReorderColumnsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reorder-columns',
  templateUrl: 'reorder-columns.html',
})
export class ReorderColumnsPage {

  board: KanbanBoard;
  currentBoardId: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public boardsDataProvider: BoardsdataProvider,
    public modalCtrl: ModalController) {
    this.board = navParams.get("currentBoard");
    this.currentBoardId = this.board.id;
    this.boardsDataProvider.boards$.subscribe((newBoards) => {
      newBoards.forEach((board) => {
        if (board.id === this.currentBoardId) {
          this.board = board;
        }
      });
    });
  }

  reorderItems(indexes) {
    let targetBoardIndex;
    this.boardsDataProvider.boards.forEach((value, index) => {
      if (value.id == this.currentBoardId) {
        targetBoardIndex = index;
      } else {
        targetBoardIndex = -1;
      }
    }
    );
    this.boardsDataProvider.boards[targetBoardIndex].columns = reorderArray(this.boardsDataProvider.boards[targetBoardIndex].columns, indexes);
    this.boardsDataProvider.writeToDataBase();
  }

  onBoardPress(column: KanbanColumn) {
    const modal = this.modalCtrl.create(EditColumnPage, { columnToBeEdited: column, currentBoard: this.board });
    modal.present();
  }

  onAddColumn(currentBoard: KanbanBoard) {
    const modal = this.modalCtrl.create(AddcolumnPage, { board: currentBoard });
    modal.present();
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
