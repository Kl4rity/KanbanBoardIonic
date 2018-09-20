import { Component, Input } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { ReorderColumnsPage } from '../reorder-columns/reorder-columns';
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'page-home',
  templateUrl: 'board.html'
})
export class BoardPage {

  @Input() board:KanbanBoard;
  private columnTitle : string;
  private vibration:Vibration;

  constructor(public navCtrl: NavController, public navParam: NavParams, public modalCtrl: ModalController, private platform:Platform) {
    this.board = navParam.get("board");

    if(this.platform.is('cordova')){
      this.vibration = new Vibration();
    }

    if(!(this.board.columns[0] === undefined || this.board.columns[0] === null)){
      this.columnTitle = this.board.columns[0].title;
    }


  }

  onColumnChange($event){
    if($event.columnIndex < this.board.columns.length && !(this.board.columns[0] === undefined || this.board.columns[0] === null)){
      this.columnTitle = this.board.columns[$event.columnIndex].title;
    }
  }

  onEditBoard(board: KanbanBoard){
    const modal = this.modalCtrl.create(ReorderColumnsPage, {currentBoard: board});
    modal.present();
  }

  onAttemptedChangeToNonexistant($boardChangeEvent){
    let boardsNotYetCreated:boolean = (this.board.columns[0] === undefined || this.board.columns[0] === null);
    let isLeftOfBoard:boolean = $boardChangeEvent.columnIndex < 0;
    let isRightOfBoard:boolean = $boardChangeEvent.columnIndex + 1 > this.board.columns.length;

    if(!boardsNotYetCreated && (isLeftOfBoard || isRightOfBoard)){
      this.vibration.vibrate(500);
    }
  }
}
