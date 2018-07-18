import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditColumnPage } from './edit-column';

@NgModule({
  declarations: [
    EditColumnPage,
  ],
  imports: [
    IonicPageModule.forChild(EditColumnPage),
  ],
})
export class EditColumnPageModule {}
