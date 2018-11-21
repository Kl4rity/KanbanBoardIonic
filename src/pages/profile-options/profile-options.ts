import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/authentication/auth.provider';
import { BoardPage } from '../board/board';
import { buildTutorialBoard } from '../../shared/tutorial.board';
import { SigninPage } from '../signin/signin';
import { BoardsdataProvider } from '../../providers/boardsdata/boardsdata.provider';
import { User } from 'firebase';

/**
 * Generated class for the ProfileOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-options',
  templateUrl: 'profile-options.html',
})
export class ProfileOptionsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public boardsprovider: BoardsdataProvider,
    private toastCtrl: ToastController
    ) {
      this.user = navParams.get('user');
  }

  public user: User;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileOptionsPage');
  }

  onLogout(){
    this.auth.logout()
    .then(()=>{
      this.boardsprovider.boards$.unsubscribe();
      this.navCtrl.push(SigninPage);
    });
  }

  onTutorial(){
    this.boardsprovider.createTutorialBoard();
    this.showToast("Tutorialboard was created! Go back to your boards and access it.");
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
