// Form.

import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata.provider';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { setInitialFocus } from '../../shared/SetInitialFocus.helper';

/**
 * Generated class for the AddcolumnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addcolumn',
  templateUrl: 'addcolumn.html',
})
export class AddcolumnPage {

  @ViewChild('columnNameInput') columnNameInput;
  currentBoard: KanbanBoard;

  constructor(public navCtrl: NavController, public navParams: NavParams, public boardsDataProvider: BoardsdataProvider) {
    this.currentBoard = navParams.get("board");
    console.log("add-column.ts constructor navParam 'board':");
    console.log(navParams.get("board"));

  }

  ionViewWillEnter(){
    setInitialFocus(this.navCtrl, this.columnNameInput);
  }

  onInputEnterPressed(columnName: string){
    this.boardsDataProvider.createColumn(this.currentBoard.id, columnName);
    this.navCtrl.pop();
  }

  dismiss(){
    this.navCtrl.pop();
  }
}
