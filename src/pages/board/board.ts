import { Component, Input } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { ReorderColumnsPage } from '../reorder-columns/reorder-columns';

@Component({
  selector: 'page-home',
  templateUrl: 'board.html'
})
export class BoardPage {

  @Input() board:KanbanBoard;
  private columnTitle : string;

  constructor(public navCtrl: NavController, public navParam: NavParams, public modalCtrl: ModalController) {
    this.board = navParam.get("board");
    if(!(this.board.columns[0] === undefined || this.board.columns[0] === null)){
      this.columnTitle = this.board.columns[0].title;
    }
  }

  onColumnChange($event){
    console.log("onColumnChange()");
    if($event.columnIndex < this.board.columns.length && !(this.board.columns[0] === undefined || this.board.columns[0] === null)){
      this.columnTitle = this.board.columns[$event.columnIndex].title;
    }
  }

  onEditBoard(board: KanbanBoard){
    const modal = this.modalCtrl.create(ReorderColumnsPage, {currentBoard: board});
    modal.present();
  }
}
