import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray, ToastController, AlertController } from 'ionic-angular';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata.provider';
import { KanbanBoard } from '../../models/KanbanBoard.model';
import { BoardPage } from '../../pages/board/board';
import { ModalController } from 'ionic-angular';
import { AddBoardPage } from '../add-board/add-board';
import { EditBoardPage } from '../edit-board/edit-board';
import { AuthProvider } from '../../providers/authentication/auth.provider';
import { SigninPage } from '../signin/signin';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  public boards: Array<KanbanBoard>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public boardsprovider: BoardsdataProvider,
    public modalCtrl: ModalController,
    public auth: AuthProvider,
    public localNotifications: LocalNotifications,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {

  }

  // subscribes to the observable $boards and continuously updates the view - and its children with the latest data.
  ionViewWillEnter() {
    this.boardsprovider.boards$.subscribe((boards) => {
      this.boards = boards;
    });
  }

  // Should the user not be logged in, the page redirects him to the sign in page.
  ionViewDidEnter() {
    this.auth.user.subscribe((user) => {
      if (user === null) {
        this.navCtrl.push(SigninPage);
      }
    });
    this.getNotificationPermission();
    this.schedulePlanningReminders()
  }

  getNotificationPermission() {
    if (!this.localNotifications.hasPermission) {
      this.showNotificationRequestAlert();
      this.localNotifications.requestPermission()
        .then(this.handlePermissionRequestResponse);
    }
  }

  showNotificationRequestAlert(){
    const alert = this.alertCtrl.create({
      title: "May we interrupt?",
      subTitle: "In order for a Kanban board to work, it needs to be kept relatively up-to-date. We would like to remind you to use the board again a week after you last checked in and then another two weeks after that. Would that be okay?",
      buttons: ["Yes."]
    });
    alert.present();
  }

  handlePermissionRequestResponse(permissionWasGranted){
    if(!permissionWasGranted){
      this.showToast("We won't be bothering you with notifications!");
    }
    if(permissionWasGranted){
      this.showToast("Thank you for your trust! We will keep it as light as possible.");
    }
  }

  async schedulePlanningReminders() {
    await this.localNotifications.clearAll();

    this.localNotifications.schedule([{
      id: 1,
      title: 'How\'s your planning going?',
      text: 'We haven\'t seen you interacting with your Kanban Boards for a while now.',
      trigger: {at: new Date(new Date().getTime() + (7*24*60*1000))}
     },{
      id: 2,
      title: 'Our last hello...',
      text: 'We hope your planning\'s going well! You haven\'t checked into Kanban for three weeks now. We assume all is well and won\'t contact you any longer!',
      trigger: {at: new Date(new Date().getTime() + (3*7*24*60*1000))}
   }]);
  }

  onBoardSelect(board: KanbanBoard) {
    this.navCtrl.push(BoardPage, { "board": board });
  }

  onAdd() {
    const modal = this.modalCtrl.create(AddBoardPage);
    modal.present();
  }

  reorderItems(indexes) {
    this.boardsprovider.boards = reorderArray(this.boardsprovider.boards, indexes);
    this.boardsprovider.writeToDataBase();
  }

  // on long press.
  onBoardPress(board: KanbanBoard) {
    this.navCtrl.push(EditBoardPage, { currentBoard: board });
  }

  private showToast(notification: string) {
    let toast = this.toastCtrl.create({
      message: notification,
      duration: 2000,
      position: "top"
    });

    toast.present(toast);
  }
}
