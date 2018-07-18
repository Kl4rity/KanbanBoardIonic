import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KanbanColumn } from '../../models/KanbanColumn.model';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata';
import { KanbanBoard } from '../../models/KanbanBoard.model';

/**
 * Generated class for the EditColumnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-column',
  templateUrl: 'edit-column.html',
})
export class EditColumnPage {

  @ViewChild('columnTitleInput') columnTitleInput;

  currentBoard: KanbanBoard;
  currentColumn: KanbanColumn;

  constructor(public navCtrl: NavController, public navParams: NavParams, public boardsDataProvider: BoardsdataProvider) {
    this.currentColumn = navParams.get("columnToBeEdited");
    this.currentBoard = navParams.get("currentBoard");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditColumnPage');
    this.columnTitleInput.value = this.currentColumn.title;
  }

  onInputEnterPressed(columnTitle: string){
    this.boardsDataProvider.editColumn(this.boardsDataProvider.boards.indexOf(this.currentBoard), this.currentColumn, columnTitle);
    this.navCtrl.pop();
  }

  onDeleteBoard(){
    this.boardsDataProvider.deleteColumn(this.boardsDataProvider.boards.indexOf(this.currentBoard), this.currentColumn);
    this.navCtrl.pop();
  }

  dismiss(){
    this.navCtrl.pop();
  }

}
