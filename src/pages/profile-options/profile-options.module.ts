import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileOptionsPage } from './profile-options';

@NgModule({
  declarations: [
    ProfileOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileOptionsPage),
  ],
})
export class ProfileOptionsPageModule {}
