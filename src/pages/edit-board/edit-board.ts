// Form.

import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata.provider';
import { setInitialFocus } from '../../shared/SetInitialFocus.helper';

/**
 * Generated class for the EditBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-board',
  templateUrl: 'edit-board.html',
})
export class EditBoardPage {

  @ViewChild('boardTitleInput') boardTitleInput;
  currentBoard: KanbanBoard;

  constructor(public navCtrl: NavController, public navParams: NavParams, public boardsDataProvider: BoardsdataProvider) {
    this.currentBoard = this.navParams.get("currentBoard");
  }

  ionViewDidLoad() {
    this.boardTitleInput.value = this.currentBoard.title;
  }

  ionViewWillEnter(){
    setInitialFocus(this.navCtrl, this.boardTitleInput); 
  }

  onInputEnterPressed(boardTitle: string){
    this.boardsDataProvider.editBoard(this.currentBoard.id, boardTitle);
    this.navCtrl.pop();
  }

  onDeleteBoard(){
    this.boardsDataProvider.deleteBoard(this.currentBoard.id);
    this.navCtrl.pop();
  }

  dismiss(){
    this.navCtrl.pop();
  }

}
