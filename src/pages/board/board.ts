// View displaying the actual board.

import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { ReorderColumnsPage } from '../reorder-columns/reorder-columns';
import { Vibration } from '@ionic-native/vibration';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata.provider';
import { isCordova } from '../../shared/isCordova.helper';


@Component({
  selector: 'page-home',
  templateUrl: 'board.html'
})

export class BoardPage {

  public board: KanbanBoard;
  public columnTitle : string;
  private boardId: string;

  constructor(
    public navCtrl: NavController,
    public navParam: NavParams,
    public modalCtrl: ModalController,
    private boardsdataProvider: BoardsdataProvider,
    public vibration: Vibration
    ) {
    this.board = navParam.get("board");
    this.boardId = this.board.id;

    this.boardsdataProvider.boards$.subscribe((newData)=>{
      newData.forEach((board)=>{
        if(board.id == this.boardId){
          this.board = board;
        }
      });
    });
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
      if(isCordova()){
        this.vibration.vibrate(200);
      }
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
