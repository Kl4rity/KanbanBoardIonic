import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray, ModalController } from 'ionic-angular';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata';
import { KanbanColumn } from '../../models/KanbanColumn.model';
import { EditColumnPage } from '../edit-column/edit-column';

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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public boardsDataProvider: BoardsdataProvider,
              public modalCtrl: ModalController) {
    this.board = navParams.get("currentBoard");
  }

  reorderItems(indexes) {
    let indexOfBoard = this.boardsDataProvider.boards.indexOf(this.board);
    this.boardsDataProvider.boards[indexOfBoard].columns = reorderArray(this.boardsDataProvider.boards[indexOfBoard].columns, indexes);
    this.boardsDataProvider.writeToDataBase();
  }

  onBoardPress(column: KanbanColumn){
    const modal = this.modalCtrl.create(EditColumnPage, {columnToBeEdited: column, currentBoard: this.board});
    modal.present();
  }

  dismiss(){
    this.navCtrl.pop();
  }
}
