// Form.

import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { KanbanColumn } from '../../models/KanbanColumn.model';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata.provider';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { setInitialFocus } from '../../shared/SetInitialFocus.helper';

/**
 * Generated class for the EditColumnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  ionViewWillEnter(){
    setInitialFocus(this.navCtrl, this.columnTitleInput);
  }

  ionViewDidLoad() {
    this.columnTitleInput.value = this.currentColumn.title;
  }

  onInputEnterPressed(columnTitle: string){
    this.boardsDataProvider.editColumn(this.currentBoard.id, this.currentColumn.id, columnTitle);
    this.navCtrl.pop();
  }

  onDeleteColumn(){
    this.boardsDataProvider.deleteColumn(this.currentBoard.id, this.currentColumn.id);
    this.navCtrl.pop();
  }

  dismiss(){
    this.navCtrl.pop();
  }
}
