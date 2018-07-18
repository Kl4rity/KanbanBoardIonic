import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { KanbanBoard } from '../../models/KanbanBoard.model';

@Component({
  selector: 'page-home',
  templateUrl: 'board.html'
})
export class BoardPage {

  @Input() board:KanbanBoard;
  private columnTitle : string;

  constructor(public navCtrl: NavController, public navParam: NavParams) {
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
}
