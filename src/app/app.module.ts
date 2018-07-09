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
import { BoardsdataProvider } from '../providers/boardsdata/boardsdata';
import { HttpClientModule } from '@angular/common/http';
import { AddBoardPage } from '../pages/add-board/add-board';
import { AddcolumnPage } from '../pages/addcolumn/addcolumn';
import { AddCardPage } from '../pages/add-card/add-card';
import { EditCardPage } from '../pages/edit-card/edit-card';

@NgModule({
  declarations: [
    MyApp,
    BoardPage,
    WelcomePage,
    AddBoardPage,
    AddcolumnPage,
    AddCardPage,
    EditCardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BoardPage,
    WelcomePage,
    AddBoardPage,
    AddcolumnPage,
    AddCardPage,
    EditCardPage
    ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BoardsdataProvider
  ]
})
export class AppModule {}
