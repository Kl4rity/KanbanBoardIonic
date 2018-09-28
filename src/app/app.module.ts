import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';


import { MyApp } from './app.component';
import { BoardPage } from '../pages/board/board';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ComponentsModule } from '../components/components.module';
import { WelcomePage } from '../pages/welcome/welcome';
import { BoardsdataProvider } from '../providers/boardsdata/boardsdata.provider';
import { HttpClientModule } from '@angular/common/http';
import { AddBoardPage } from '../pages/add-board/add-board';
import { AddcolumnPage } from '../pages/addcolumn/addcolumn';
import { AddCardPage } from '../pages/add-card/add-card';
import { EditCardPage } from '../pages/edit-card/edit-card';
import { EditBoardPage } from '../pages/edit-board/edit-board';
import { ReorderColumnsPage } from '../pages/reorder-columns/reorder-columns';
import { EditColumnPage } from '../pages/edit-column/edit-column';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { fireBaseConfig } from '../secrets/firebase.secret';
import { AuthProvider } from '../providers/authentication/auth.provider';
import { SigninPage } from '../pages/signin/signin';
import { FormsModule } from '@angular/forms';

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
    SigninPage
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
    SigninPage
    ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BoardsdataProvider,
    AuthProvider,
    AngularFireAuth,
    AngularFireDatabase
  ]
})
export class AppModule {}
