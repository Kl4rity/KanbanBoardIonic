import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray } from 'ionic-angular';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata.provider';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { BoardPage } from '../../pages/board/board';
import { ModalController } from 'ionic-angular';
import { AddBoardPage } from '../add-board/add-board';
import { EditBoardPage } from '../edit-board/edit-board';
import { AuthProvider } from '../../providers/authentication/auth.provider';
import { SigninPage } from '../signin/signin';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  public boards:Array<KanbanBoard>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public boardsprovider: BoardsdataProvider,
    public modalCtrl: ModalController,
    public auth: AuthProvider
    ) {
    this.boards = this.boardsprovider.getBoards();

  }

  ngAfterContentChecked(){
    this.boards = this.boardsprovider.getBoards();
  }

  onBoardSelect(board:KanbanBoard){
    this.navCtrl.push(BoardPage, {"board": board});
  }

  onAdd(){
    const modal = this.modalCtrl.create(AddBoardPage);
    modal.present();
  }

  reorderItems(indexes) {
    this.boardsprovider.boards = reorderArray(this.boardsprovider.boards, indexes);
    this.boardsprovider.writeToDataBase();
  }

  onBoardPress(board: KanbanBoard){
    this.navCtrl.push(EditBoardPage, {currentBoard: board});
  }

  ionViewDidEnter(){
    this.auth.user.subscribe((user)=>{
      if(user === null){
        this.navCtrl.push(SigninPage);
      }
    });
  }
}
