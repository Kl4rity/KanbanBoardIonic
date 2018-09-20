import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { setInitialFocus } from '../../shared/SetInitialFocus.helper';

/**
 * Generated class for the AddcolumnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcolumn',
  templateUrl: 'addcolumn.html',
})
export class AddcolumnPage {

  @ViewChild('columnNameInput') columnNameInput;
  currentBoard: KanbanBoard;

  constructor(public navCtrl: NavController, public navParams: NavParams, public boardsDataProvider: BoardsdataProvider) {
    this.currentBoard = navParams.get("board");
  }

  ionViewWillEnter(){
    setInitialFocus(this.navCtrl, this.columnNameInput);
  }

  onInputEnterPressed(columnName: string){
    this.boardsDataProvider.createColumn((this.boardsDataProvider.boards.indexOf(this.currentBoard)), columnName);
    this.navCtrl.pop();
  }

  dismiss(){
    this.navCtrl.pop();
  }
}
