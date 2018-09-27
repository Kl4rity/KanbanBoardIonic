import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { ReorderColumnsPage } from '../reorder-columns/reorder-columns';
import { Vibration } from '@ionic-native/vibration';
import { isCordova } from '../../shared/isCordova.helper';


@Component({
  selector: 'page-home',
  templateUrl: 'board.html'
})

export class BoardPage {

  public board: KanbanBoard;
  public columnTitle : string;
  private vibration:Vibration;

  constructor(public navCtrl: NavController, public navParam: NavParams, public modalCtrl: ModalController) {
    
    this.board = navParam.get("board");

    if(isCordova()){
      this.vibration = new Vibration();
    }
    if(this.doBoardsExist()){
      this.columnTitle = this.board.columns[0].title;
    }
  }
  onEditBoard(board: KanbanBoard){
    const modal = this.modalCtrl.create(ReorderColumnsPage, {currentBoard: board});
    modal.present();
  }
  onColumnChange($event){
    this.loadCurrentColumnTitleIntoStatusBarIfItExists($event);
    this.handleAttemptToSwitchToNonexistantColumn($event);
  }
  private handleAttemptToSwitchToNonexistantColumn($boardChangeEvent){
    let isLeftOfBoard:boolean = $boardChangeEvent.columnIndex < 0;
    let isRightOfBoard:boolean = $boardChangeEvent.columnIndex + 1 > this.board.columns.length;

    if(this.doBoardsExist() && (isLeftOfBoard || isRightOfBoard)){
      this.vibration.vibrate(500);
    }
  }
  private loadCurrentColumnTitleIntoStatusBarIfItExists($boardChangeEvent){
    let columnChangedToExists: boolean = $boardChangeEvent.columnIndex < this.board.columns.length;

    if(columnChangedToExists && this.doBoardsExist()){
      this.columnTitle = this.board.columns[$boardChangeEvent.columnIndex].title;
    }
  }
  private doBoardsExist(){
    return !(this.board.columns[0] === undefined || this.board.columns[0] === null);
  }
}
