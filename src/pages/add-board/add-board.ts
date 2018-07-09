import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata';

/**
 * Generated class for the AddBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-board',
  templateUrl: 'add-board.html',
})
export class AddBoardPage {

  @ViewChild('boardNameInput') boardNameInput;

  constructor(public navCtrl: NavController, public navParams: NavParams, public boardsDataProvider: BoardsdataProvider) {
    // this.boardNameInput.setFocus();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBoardPage');
  }

  // ngAfterViewChecked()	{
  //   this.boardNameInput.setFocus();
  // }

  onInputEnterPressed(boardName: string){
    console.log(boardName);
    this.boardsDataProvider.createBoard(boardName);
    this.navCtrl.pop();
  }

  dismiss(){
    this.navCtrl.pop();
  }
}

