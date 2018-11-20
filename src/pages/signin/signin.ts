import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/authentication/auth.provider';
import 'rxjs/add/operator/take';
import { setInitialFocus } from '../../shared/SetInitialFocus.helper';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})

export class SigninPage {

  // If the user is not set, the entry component (welcome.ts) redirects the user to the sign in page and prevents him from leaving until it is set. 
  // It subscribes to the user object and, as soon as it is set, it pops the sign in page from the nav-stack.

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
    auth.user.subscribe(user => {
      if (user) {
        this.canLeave = true;
        this.navCtrl.pop();
        this.showToast(`Successfully authenticated with ${user.email}.`);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  ionViewWillEnter() {
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
      .then((value) => {
        // Handled in subscribe at the top of the class.
      }).catch((error) => {
        this.showToast(error);
      });
  }

  onForgotPassword() {
    if (!this.loginEmail) {
      this.showToast("Please supply an email address.");
      return;
    };

    this.auth.sendPasswordReset(this.loginEmail)
      .then(() => {
        this.showToast("Password reset sent - please check your email.");
      })
      .catch((err)=>{
        this.showToast(err);
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
        setTimeout(() => {
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
