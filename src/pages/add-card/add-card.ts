// Form.

import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata.provider';
import { setInitialFocus } from '../../shared/SetInitialFocus.helper';

/**
 * Generated class for the AddCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-card',
  templateUrl: 'add-card.html',
})
export class AddCardPage {

  @ViewChild('cardTitleInput') cardTitleInput;
  @ViewChild('cardContentInput') cardContentInput;
  @ViewChild('cardTimeInput') cardTimeInput;

  currentBoard: KanbanBoard;
  columnNumber: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public boardsDataProvider: BoardsdataProvider) {
    this.currentBoard = navParams.get("board");
    console.log("add-card navParams - board");
    console.log(this.currentBoard);
    this.columnNumber = navParams.get("column");
  }

  ionViewWillEnter(){
    setInitialFocus(this.navCtrl, this.cardTitleInput);
  }

  onInputEnterPressed(cardTitle: string, cardContent: string, cardTime: number){
    console.log("onInputEnterPressed() board:");
    console.log(this.currentBoard);
    this.boardsDataProvider.createCard(this.currentBoard.id, this.currentBoard.columns[this.columnNumber].id, cardTitle, cardTime, cardContent);
    this.navCtrl.pop();
  }

  onShiftFocusToContent(){
    this.cardContentInput.setFocus();
  }

  onShiftFocusToTime(){
    this.cardTimeInput.setFocus();
  }

  dismiss(){
    this.navCtrl.pop();
  }
}
