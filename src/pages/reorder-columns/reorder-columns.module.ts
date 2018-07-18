import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReorderColumnsPage } from './reorder-columns';

@NgModule({
  declarations: [
    ReorderColumnsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReorderColumnsPage),
  ],
})
export class ReorderColumnsPageModule {}
