import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { BoardPage } from '../../pages/board/board';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  public boards:Array<KanbanBoard>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public boardsprovider: BoardsdataProvider) {

  }

  ionViewDidLoad() {
    this.boards = this.boardsprovider.getBoards();
  }

  onBoardSelect(board:KanbanBoard){
    this.navCtrl.push(BoardPage, {"board": board});
  }
}
