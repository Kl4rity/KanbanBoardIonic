import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

// Ionic Native Modules:
import { Vibration } from '@ionic-native/vibration';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// My App
import { MyApp } from './app.component';

// My Pages
import { AddBoardPage } from '../pages/add-board/add-board';
import { AddcolumnPage } from '../pages/addcolumn/addcolumn';
import { AddCardPage } from '../pages/add-card/add-card';
import { EditCardPage } from '../pages/edit-card/edit-card';
import { EditBoardPage } from '../pages/edit-board/edit-board';
import { ReorderColumnsPage } from '../pages/reorder-columns/reorder-columns';
import { EditColumnPage } from '../pages/edit-column/edit-column';
import { WelcomePage } from '../pages/welcome/welcome';
import { BoardPage } from '../pages/board/board';
import { SigninPage } from '../pages/signin/signin';
import { ProfileOptionsPage } from '../pages/profile-options/profile-options';

// My Components
import { ComponentsModule } from '../components/components.module';

//My Providers
import { BoardsdataProvider } from '../providers/boardsdata/boardsdata.provider';
import { AuthProvider } from '../providers/authentication/auth.provider';

// My Secrets
import { fireBaseConfig } from '../secrets/firebase.secret';


@NgModule({
  declarations: [
    MyApp,
    BoardPage,
    WelcomePage,
    AddBoardPage,
    AddcolumnPage,
    AddCardPage,
    EditCardPage,
    EditBoardPage,
    ReorderColumnsPage,
    EditColumnPage,
    SigninPage,
    ProfileOptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(fireBaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BoardPage,
    WelcomePage,
    AddBoardPage,
    AddcolumnPage,
    AddCardPage,
    EditCardPage,
    EditBoardPage,
    ReorderColumnsPage,
    EditColumnPage,
    SigninPage,
    ProfileOptionsPage
    ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BoardsdataProvider,
    AuthProvider,
    AngularFireAuth,
    AngularFireDatabase,
    Vibration,
    LocalNotifications
  ]
})
export class AppModule {}
