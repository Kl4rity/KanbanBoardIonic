import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata';

/**
 * Generated class for the EditBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-board',
  templateUrl: 'edit-board.html',
})
export class EditBoardPage {

  @ViewChild('boardTitleInput') boardTitleInput;
  currentBoard: KanbanBoard;

  constructor(public navCtrl: NavController, public navParams: NavParams, public boardsDataProvider: BoardsdataProvider) {
    this.currentBoard = navParams.get("currentBoard");
  }

  ionViewDidLoad() {
    this.boardTitleInput.value = this.currentBoard.title;
  }

  onInputEnterPressed(boardTitle: string){
    this.boardsDataProvider.editBoard(this.currentBoard, boardTitle);
    this.navCtrl.pop();
  }

  onDeleteBoard(){
    this.boardsDataProvider.deleteBoard(this.currentBoard);
    this.navCtrl.pop();
  }

  dismiss(){
    this.navCtrl.pop();
  }

}
