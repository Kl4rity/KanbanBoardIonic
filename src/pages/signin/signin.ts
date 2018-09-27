import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/authentication/auth.provider';
import 'rxjs/add/operator/take';
import { setInitialFocus } from '../../shared/SetInitialFocus.helper';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})

export class SigninPage {

  private canLeave: boolean = false;
  public loginVisible: boolean = true;

  // UI Components
  @ViewChild('loginEmailInput') loginEmailInput;
  @ViewChild('loginPasswordInput') loginPasswordInput;
  @ViewChild('createEmailInput') createEmailInput;
  @ViewChild('createPasswordInput') createPasswordInput;
  @ViewChild('createPasswordRepeatInput') createPasswordRepeatInput;

  // Models:
  public loginEmail = "";
  public loginPassword = "";

  public createEmail = "";
  public createPassword = "";
  public createPasswordRepeat = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private toastCtrl: ToastController,
  ) {
    // Empty constructor.
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  ionViewWillEnter(){
    setInitialFocus(this.navCtrl, this.loginEmailInput);
  }

  ionViewCanLeave() {
    return this.canLeave;
  }

  onSignInButton() {
    if (!this.loginEmail || !this.loginPassword) {
      this.showToast("Please fill in both email and password.");
      return;
    }

    this.auth.login(this.loginEmail, this.loginPassword)
      .then(
        (value) => {
          this.canLeave = true;
          this.navCtrl.pop();
        }).catch((error)=>{
        this.showToast(error);
      });
  }

  onCreateAccountButton() {
    // TODO: Check whether it is a valid email - postponed.

    if (!this.createUserAllFieldsFilled()) {
      this.showToast("Please set all fields.");
      return;
    }
    // Check whether the two passwords match up
    if (!(this.createPassword == this.createPasswordRepeat)) {
      this.showToast("Please ensure that the two password fields match.");
      return;
    }
    // Check whether the password is long enough.
    if (!(this.createPassword.length >= 6)) {
      this.showToast("Please choose a password longer than 6 characters.");
      return;
    }
    // In case of a successful return - toggle the loginVisible
    this.auth.createUser(this.createEmail, this.createPassword)
        .then(() => {
          this.showToast("Account was created. Feel free to log in by pressing Enter.");
          this.toggleLoginCreateAccount();
          setTimeout(()=>{
            this.loginPasswordInput.setFocus();
          }, 600);
          this.loginEmail = this.createEmail.valueOf();
          this.loginPassword = this.createPassword.valueOf();
        }
      );
  }

  private createUserAllFieldsFilled(): boolean {
    let emailIsSet: boolean = this.createEmail.length > 0;
    let passwordIsSet: boolean = this.createPassword.length > 0;
    let passwordRepeatIsSet: boolean = this.createPassword.length > 0;

    return (emailIsSet && passwordIsSet && passwordRepeatIsSet);
  }

  private toggleLoginCreateAccount() {
    console.log("Toggle pressed.");
    this.loginVisible = !this.loginVisible;
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