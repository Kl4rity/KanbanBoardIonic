// Form.

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata.provider';
import { KanbanCard } from '../../models/KanbanCard.model';
import { setInitialFocus } from '../../shared/SetInitialFocus.helper';

/**
 * Generated class for the EditCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-card',
  templateUrl: 'edit-card.html',
})
export class EditCardPage {

  
  @ViewChild('cardTitleInput') cardTitleInput;
  @ViewChild('cardContentInput') cardContentInput;
  @ViewChild('cardTimeInput') cardTimeInput;

  currentBoard: KanbanBoard;
  columnNumber: number;
  card: KanbanCard;

  constructor(public navCtrl: NavController, public navParams: NavParams, public boardsDataProvider: BoardsdataProvider) {
    this.currentBoard = navParams.get("currentBoard");
    this.columnNumber = navParams.get("column");
    this.card = navParams.get("currentCard");
  }

  ionViewWillEnter(){
    setInitialFocus(this.navCtrl, this.cardTitleInput);
  }

  ionViewDidLoad() {
    this.cardTitleInput.value = this.card.title;
    this.cardContentInput.value = this.card.content;
    this.cardTimeInput.value = this.card.timeEstimate;
  }

  onInputEnterPressed(cardTitle: string, cardContent: string, cardTime: number){
    this.boardsDataProvider.editCard(this.currentBoard.id, this.currentBoard.columns[this.columnNumber].id, this.card.id, cardTitle, cardTime, cardContent);
    this.navCtrl.pop();
  }

  onDeleteCard(){
    this.boardsDataProvider.deleteCard(this.currentBoard.id,this.currentBoard.columns[this.columnNumber].id, this.card.id);
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
