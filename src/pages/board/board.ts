import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { KanbanBoard } from '../../models/KanbanBoard.model';

@Component({
  selector: 'page-home',
  templateUrl: 'board.html'
})
export class BoardPage {

  @Input() board:KanbanBoard;

  constructor(public navCtrl: NavController, public navParam: NavParams) {
    this.board = navParam.get("board");
  }

}
